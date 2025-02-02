use state::{GraphicStorage, Storage};
use std::sync::Mutex;
#[cfg(debug_assertions)]
use tauri::Manager;
use tauri_plugin_aptabase::EventTracker;
use tauri_plugin_log::{Target, TargetKind, WEBVIEW_TARGET};

use dotenvy_macro::dotenv;

mod biome;
mod graphics;
mod info;
mod open_explorer;
mod parsing;
mod search_handler;
pub mod state;
pub mod tracking;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
/// This function sets up and runs a Rust application using the Tauri framework, with various plugins
/// and event handlers.
/// # Panics
/// This function will panic if the Tauri app fails to build or run.
pub fn run() {
    #[allow(clippy::expect_used)]
    tauri::Builder::default()
        // Add updater
        .setup(|app| {
            // Use the updater plugin only on desktop platforms (Windows, Linux, macOS)
            #[cfg(desktop)]
            app.handle()
                .plugin(tauri_plugin_updater::Builder::new().build())?;
            // Open the dev tools automatically when debugging the application
            #[cfg(debug_assertions)]
            if let Some(main_window) = app.get_window("main") {
                main_window.open_devtools();
            };
            Ok(())
        })
        // Set up shared state
        .manage(Storage {
            store: Mutex::default(),
            search_lookup: Mutex::default(),
        })
        .manage(GraphicStorage {
            graphics_store: Mutex::default(),
            tile_page_store: Mutex::default(),
        })
        // Add logging plugin
        .plugin(
            tauri_plugin_log::Builder::default()
                .clear_targets()
                .targets([
                    Target::new(TargetKind::Webview),
                    Target::new(TargetKind::LogDir {
                        file_name: Some("webview.log".into()),
                    })
                    .filter(|metadata| metadata.target() == WEBVIEW_TARGET),
                    Target::new(TargetKind::LogDir {
                        file_name: Some("rust.log".into()),
                    })
                    .filter(|metadata| metadata.target() != WEBVIEW_TARGET),
                ])
                .format(move |out, message, record| {
                    out.finish(format_args!(
                        "{} [{}] {}",
                        chrono::Local::now().format("%Y-%m-%d %H:%M:%S"),
                        record.level(),
                        message
                    ));
                })
                .level(log::LevelFilter::Info)
                .build(),
        )
        // Add window-state plugin
        .plugin(tauri_plugin_window_state::Builder::default().build())
        // Add fs plugin
        .plugin(tauri_plugin_fs::init())
        // Add window plugin
        .plugin(tauri_plugin_dialog::init())
        // Add process plugin
        .plugin(tauri_plugin_process::init())
        // Add simple storage plugin
        .plugin(tauri_plugin_store::Builder::default().build())
        // Add aptabase plugin
        .plugin(tauri_plugin_aptabase::Builder::new(dotenv!("APTABASE_KEY")).build())
        // Add invoke handlers
        .invoke_handler(tauri::generate_handler![
            parsing::passthrough::parse_raws_info,
            search_handler::prepare::parse_and_store_raws,
            search_handler::search::search_raws,
            search_handler::util::get_search_string_for_object,
            info::get_build_info,
            graphics::search::get_graphics_for_identifier,
            open_explorer::show_in_folder,
            biome::lookup::get_biome_description,
        ])
        .build(tauri::generate_context!())
        .expect("Error when building tauri app")
        .run(|handler, event| match event {
            tauri::RunEvent::Exit { .. } => {
                handler.track_event("app_exited", None);
                handler.flush_events_blocking();
            }
            tauri::RunEvent::Ready { .. } => {
                handler.track_event("app_started", None);
            }
            _ => {}
        });
}
