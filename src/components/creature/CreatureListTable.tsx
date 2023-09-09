import { Component, For } from 'solid-js';
import { toTitleCase } from '../../definitions/Utils';
import type { CasteRange } from '../../definitions/types';

const CreatureListTable: Component<{ values: CasteRange<string[]>; fallbackDesc: string }> = (props) => {
  const values = props.values;
  return (
    <table class='table table-xs'>
      <tbody>
        <For each={Object.keys(values)} fallback={<p>{props.fallbackDesc}</p>}>
          {(caste) => (
            <tr>
              <td>{toTitleCase(caste)}</td>
              <td>{values[caste].join(', ')}</td>
            </tr>
          )}
        </For>
      </tbody>
    </table>
  );
};

export default CreatureListTable;
