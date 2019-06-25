import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import Mock from 'mockjs'
import { Todos } from './data/todoList'

export default {
  /**
   * mock start
   */
  start () {
    let mock = new MockAdapter(axios)
    // 获取todo列表
    mock.onGet('/todo/list').reply(config => {
      let mockTodo = Todos.map(todo => {
        return {
          id: todo.id,
          title: todo.title,
          count: todo.record.filter(data => {
            if (data.checked === false) return true
            return false
          }).length,
          locked: todo.locked,
          isDelete: todo.isDelete
        }
      }).filter(todo => {
        if (todo.isDelete === true) return false
        return true
      })
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([
            200,
            {
              todos: mockTodo
            }
          ])
        }, 200)
      })
    })
    // 新增todo
    mock.onPost('/todo/addTodo').reply(config => {
      Todos.push({
        id: Mock.Random.guid(),
        title: 'newList',
        isDelete: false,
        locked: false,
        record: []
      })
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200])
        }, 200)
      })
    })
    // 根据id获取todo列表
    mock.onGet('/todo/listId').reply(config => {
      let { id } = config.params
      let todo = Todos.find(todo => {
        return id && todo.id === id
      })
      todo.count = todo.record.filter(data => {
        return data.checked === false
      }).length
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([
            200,
            {
              todo
            }
          ])
        }, 200)
      })
    })
    // 新增一条代办事项
    mock.onPost('/todo/addRecord').reply(config => {
      let { id, text } = JSON.parse(config.data)
      // id 是传进来的值唯一待办项的id
      // text 用户新增输入的数据
      Todos.some((t, index) => {
        if (t.id === id) {
          t.record.push({
            text,
            isDelete: false,
            checked: false
          })
          return true
        }
      })
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200])
        }, 200)
      })
    })
    // 修改标题
    mock.onPost('/todo/editTodo').reply(config => {
      let { todo } = JSON.parse(config.data)
      Todos.some((t, index) => {
        if (t.id === todo.id) {
          t.title = todo.title
          t.locked = todo.locked
          t.isDelete = todo.isDelete
          return true
        }
      })
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200])
        }, 200)
      })
    })
    // 修改record
    mock.onPost('/todo/editRecord').reply(config => {
      let { id, record, index } = JSON.parse(config.data)
      Todos.some(t => {
        if (t.id === id) {
          t.record[index] = record
          return true
        }
      })
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200])
        }, 200)
      })
    })
  }
}
