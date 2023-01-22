import { useState } from 'react'
import { Select, selectOptions } from './select'
const options = [
  { value: 1, label: 'one' },
  { value: 2, label: 'second' },
  { value: 3, label: 'third' },
  { value: 4, label: 'fourth' },
  { value: 5, label: 'fifth' },
]
function App() {
  const [value1, setvalue1] = useState<selectOptions[]>([options[0]])
  const [value2, setvalue2] = useState<selectOptions>(options[0])
  function onChangeHandler(value: any) {
    setvalue1(value)
  }
  function onChangeHandler1(value: any) {
    setvalue2(value)
  }
  return (<>
    <Select multiple={true} option={options} onChange={onChangeHandler} value={value1} />
    <br/>
    <Select multiple={false} option={options} onChange={onChangeHandler1} value={value2} />
  </>)
}

export default App
