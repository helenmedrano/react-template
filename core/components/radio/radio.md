```js
initialState = { value: 3 };
<div>
  <p><strong>Who does <i>Number 2</i> work for?</strong></p>
  <p>
    <Radio 
      id="radio1" 
      label="Number 1" 
      value={1} 
      checked={1 === state.value} 
      onClick={() => setState({ value: 1 })}
    />
  </p>
  <p>
    <Radio 
      id="radio3" 
      label="Number 3" 
      value={3} 
      checked={3 === state.value} 
      disabled 
      onClick={() => setState({ value: 3 })}
    />
  </p>
  <p>
    <span>Inline radios:</span>
    <Radio 
      id="radio4" 
      label="Number 4" 
      checked 
      inline 
      value={4} 
      checked={4 === state.value} 
      onClick={() => setState({ value: 4 })}
    />
    <Radio 
      id="radio5" 
      label="Number 5" 
      inline 
      value={5} 
      checked={5 === state.value} 
      onClick={() => setState({ value: 5 })}
    />
  </p>
</div>
```