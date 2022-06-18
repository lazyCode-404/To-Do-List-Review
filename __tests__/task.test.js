import { getTasks } from '../src/modules/task.js';
import LocalStorage from '../__mocks__/localStorage.js';

let testTasks = new LocalStorage;
const task = {
    description: '',
    completed: '',
    index: '',
};

for (let i = 0; i < 3; i++){
    task.index = i+1
    task.description = `${task.index} + task`
    task.completed = false;
    testTasks.updateStorage('taskArr', task)
}

test('test task returned',()=>{
    expect(getTasks).toBe('returned Array');
})