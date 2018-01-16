```js
initialState = { active: false };

<div>
  <div>A standard loader: <Loader active={!state.active} /></div>
  <br />
  <div>An inline standard loader: <Loader active={!state.active} inline /></div>
  <br />
  <div style={{ position: 'relative' }}>
    <Loader active={!state.active} fill />
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sem sapien, mollis sed tortor nec, aliquet ornare diam. Etiam in gravida tortor, venenatis mollis enim. Cras sodales sodales purus, vel blandit nunc commodo posuere. Nulla facilisi. Pellentesque mi ligula, lobortis id tincidunt ut, auctor ac augue. In efficitur non lacus eget egestas. Proin nec augue diam. Ut facilisis lectus sem, vel egestas turpis eleifend ut. Sed hendrerit id ante vel eleifend. Donec ut aliquam erat, faucibus iaculis purus. Proin lobortis, risus in posuere interdum, nulla mauris facilisis nulla, vitae semper risus ligula eget purus. Curabitur accumsan condimentum mauris, blandit mollis lacus consequat at.
    </p>
  </div>
  <br />
  <div style={{ position: 'relative' }}>
    <button
      style={{ position: 'relative', zIndex: 1000000 }}
      onClick={() => setState({ active: !state.active })}
    >
      {state.active ? 'Hide' : 'Show'} "cover" modal
    </button>
    <Loader active={state.active} cover />
  </div>
  <br />
  <div style={{ position: 'relative' }}>
    <Loader active={!state.active} fill>$$</Loader>
    <p>With a custom symbol</p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sem sapien, mollis sed tortor nec, aliquet ornare diam. Etiam in gravida tortor, venenatis mollis enim. Cras sodales sodales purus, vel blandit nunc commodo posuere. Nulla facilisi. Pellentesque mi ligula, lobortis id tincidunt ut, auctor ac augue. In efficitur non lacus eget egestas. Proin nec augue diam. Ut facilisis lectus sem, vel egestas turpis eleifend ut. Sed hendrerit id ante vel eleifend. Donec ut aliquam erat, faucibus iaculis purus. Proin lobortis, risus in posuere interdum, nulla mauris facilisis nulla, vitae semper risus ligula eget purus. Curabitur accumsan condimentum mauris, blandit mollis lacus consequat at.
    </p>
  </div>
</div>
```
