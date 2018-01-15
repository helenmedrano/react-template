```js
initialState = { a: false, b: true, c: false, d: false, e: false };
<div>
  <p>Select all that apply.</p>
  <div>
    <Checkbox
      id="checkbox1"
      label="A"
      value="a"
      checked={state.a}
      onClick={() => setState({ a: !state.a })}
    />
  </div>
  <br />
  <div>
    <Checkbox
      id="checkbox3"
      label="B"
      value="b"
      checked={state.b}
      disabled
      onClick={() => setState({ b: !state.b })}
    />
  </div>
  <br />
  <div>
    <span>Inline checkboxs:</span>
    <Checkbox
      id="checkbox4"
      label="C"
      checked
      inline
      value="c"
      checked={state.c}
      onClick={() => setState({ c: !state.c })}
    />
    <Checkbox
      id="checkbox5"
      label="D"
      inline
      value="d"
      checked={state.d}
      onClick={() => setState({ d: !state.d })}
    />
  </div>
</div>
```
