```js
initialState = { value: '' };
<Select 
  placeholder="What's your favorite number?"
  options={[
    { value: 1, text: 'Number 1' },
    { value: 2, text: 'Number 2' },
    { value: 3, text: 'Number 3' }
  ]}
  onSelect={value => setState({ value })}
  value={state.value}
/>
```