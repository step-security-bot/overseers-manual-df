import { Accordion } from 'solid-bootstrap';
import { Component, createMemo, For } from 'solid-js';
import { Creature, isCreature } from '../definitions/Creature';
import { Raw, RawsFirstLetters } from '../definitions/Raw';
import CreatureListing from './CreatureListing';

const Listing: Component<{ data: Raw[]; searchString: string }> = (props) => {
  // Perform the filter on the data we have.
  const listingList = createMemo((): Raw[] => {
    return props.data.filter((raw) => {
      return (
        // check if the search string is in the name
        raw.names.join('*').includes(props.searchString) ||
        // check if the search string is in the name
        raw.description.includes(props.searchString) ||
        // check if the search string is egg(s) to display all egg_layers (if it is a creature)
        ((props.searchString.toLowerCase() === 'egg' || props.searchString.toLowerCase() === 'eggs') &&
          isCreature(raw) &&
          (raw as Creature).lays_eggs)
      );
    });
  });
  // The alphabet but only the letters for which we have entries.
  const alphaHeadings = createMemo(() => {
    return RawsFirstLetters(listingList() as Raw[]);
  });
  // const [pages, setPages] = createSignal([]);
  return (
    <ul class='list-unstyled'>
      <For each={alphaHeadings()}>
        {(letter) => (
          <li>
            <strong class='fs-3 listing-letter'>{letter.toUpperCase()}</strong>
            <Accordion flush>
              <For each={listingList().filter((v) => v.names[0].startsWith(letter))} fallback={<div>No items</div>}>
                {(raw) => (isCreature(raw) ? <CreatureListing item={raw as Creature} /> : '')}
              </For>
            </Accordion>
          </li>
        )}
      </For>
    </ul>
  );
};

export default Listing;
