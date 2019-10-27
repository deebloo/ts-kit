export function Prop() {
  return function(instance: any, key: string) {
    instance.props = instance.props || [];

    instance.props.push(key);
  };
}
