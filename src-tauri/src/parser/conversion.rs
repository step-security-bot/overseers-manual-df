use std::collections::HashMap;

use serde::{Deserialize, Serialize};

use super::raws::creature::{DFCreature, DFBodySize};

// Creature Object for Web Consumption
#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct WebCreature {
    identifier: String,
    parent_raw: String,
    #[serde(rename = "objectId")]
    object_id: String,
    names: Vec<String>,
    description: String,
    max_age: HashMap<String, [u16; 2]>,
    clutch_size: HashMap<String, [u16; 2]>,
    lays_eggs: bool,
    based_on: String,
    biomes: Vec<String>,
    cluster_range: [u16; 2],
    body_size: HashMap<String, Vec<DFBodySize>>,
}

impl WebCreature {
    pub fn from(creature: DFCreature) -> Self {
        Self {
            identifier: creature.get_identifier(),
            parent_raw: creature.get_parent_raw(),
            object_id: creature.get_object_id(),
            names: creature.get_all_names(),
            description: creature.get_description(),
            max_age: creature.get_max_ages(),
            clutch_size: creature.get_clutch_sizes(),
            lays_eggs: creature.lays_eggs(),
            based_on: creature.copy_tags_from.join(""),
            biomes: Vec::clone(&creature.biomes),
            cluster_range: creature.cluster_number,
            body_size: creature.get_body_sizes(),
        }
    }
}
