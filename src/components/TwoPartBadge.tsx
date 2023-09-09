import { Component } from 'solid-js';

export type TwoPartBadgeProps = {
  bg: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
  text?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
  name: string;
  value: string;
};

const TwoPartBadge: Component<TwoPartBadgeProps> = (props) => {
  const noValue = props.value.length === 0;
  return (
    <div class='join'>
      <span class={`${noValue ? '' : 'rounded-e-none'} badge badge-${props.bg}`}>{props.name}</span>
      {noValue ? <></> : <span class='rounded-s-none badge badge-secondary font-semibold ps-0.5'>{props.value}</span>}
    </div>
  );
};

export default TwoPartBadge;
