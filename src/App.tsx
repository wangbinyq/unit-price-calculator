import React, { useReducer } from 'react';
import { Table, InputNumber, Button, Input } from 'antd';
import './App.scss';


interface Item {
  name: string
  price: number
  count: number
  quantity: number,
  discount: number
}

function renderUnit(val: any, item: Item, idx: number) {
  return `${(item.price * item.discount / (item.count * item.quantity)).toFixed(2)}`
}

type State = Item[]
type Action =
  | { type: 'add' }
  | { type: 'clear' }
  | { type: 'delete', idx: number }
  | { type: 'update', key: string, val: any, idx: number}

function reducer(items: State, action: Action): State {
  switch(action.type) {
    case 'add':
      return [{ name: '', price: 0, count: 1, discount: 1, quantity: 1 }, ...items]
    case 'clear':
      return[]
    case 'delete':
      return items.splice(action.idx, 1)
    case 'update':
      return [
        ...items.slice(0, action.idx),
        {...items[action.idx], [action.key]: action.val } as Item,
        ...items.slice(action.idx+1)
      ]
  }
}

function App() {

  const [ items, dispatch ] = useReducer(reducer, [])

  const columns = [
    { title: '名称', dataIndex: 'name', render: (val: any, item: Item, idx: number) => {
      return <Input value={val} onChange={e => dispatch({ type: 'update', key: 'name', val: e.target.value, idx, }) }></Input>
    } },
    { title: '数量', dataIndex: 'count', render: (val: any, item: Item, idx: number) => {
        return <InputNumber value={val} onChange={val => dispatch({type: 'update', key: 'count', val, idx})}></InputNumber>
      }
    },
    {
      title: '质量', dataIndex: 'quantity', render: (val: any, item: Item, idx: number) => {
        return <InputNumber value={val} onChange={val => dispatch({type: 'update', key: 'quantity', val, idx})}></InputNumber>
      }
    },
    {
      title: '价格', dataIndex: 'price', render: (val: any, item: Item, idx: number) => {
        return <InputNumber value={val} onChange={val => dispatch({type: 'update', key: 'price', val, idx})}></InputNumber>
      }
    },
    {
      title: '单价', dataIndex: 'unit', render: renderUnit
    },
    {
      title: '操作', dataIndex: 'action', render: (val: any, item: Item, idx: number) => {
        return <Button type="danger" onClick={() => dispatch({type: 'delete', idx })}>删除</Button>
      }
    }
  ]

  return (
    <div className="App">
      <div className="table-wrapper">
        <div className="table-header">
          <Button type="primary" style={{marginLeft: 10}}
            onClick={() => dispatch({ type: 'add' })}>
            添加
          </Button>
          <Button type="danger" onClick={() => dispatch({type: 'clear'})}>
            清空
          </Button>
        </div>
        <Table dataSource={items}
          pagination={false}
          rowKey={(item) => items.findIndex(v => v === item)}
          columns={columns}></Table>
      </div>
    </div>
  );
}

export default App;
