//Importação de estilização
import '../global.css'
import styles from './Tasks.module.css'

//Importação de bibliotecas
import { PlusCircle } from 'phosphor-react'
import { Task } from './Task'
import { useState } from 'react'
import { FormEvent, ChangeEvent } from 'react'

interface taskType {
  id: string,
  content: string,
  isComplete: boolean
} 

export function Tasks() {

    const [newTaskContent, setNewTaskContent] = useState('')

    const [tasks, setTasks] = useState<taskType[]>
    ([])

    function handleCreateTask(event: FormEvent) {
      event.preventDefault()

       setTasks ([
         ...tasks,
         {
           id: crypto.randomUUID(),
           content: `${newTaskContent}`,
           isComplete: false
         }
       ])
       setNewTaskContent('')
    }

    function deleteTask(taskToDelete: string) {
      const tasksWhithoutDeletedOne = tasks.filter( task =>
        {return task.id !== taskToDelete}
      )

      setTasks(tasksWhithoutDeletedOne) 
    }

    function switchState(taskToSwitch: string) {
      const newTasks = tasks.map(task => 
        { if (task.id === taskToSwitch) {
           return {
            ...task,
            isComplete: !task.isComplete
           }
        }
        return task
      })
      setTasks(newTasks)
    }

    function handleNewTaskChange (event: ChangeEvent<HTMLTextAreaElement>) {
      event.target.setCustomValidity('')
      setNewTaskContent(event.target.value)
    }

    const tasksQuantity = tasks.length

    function isCompleted({isComplete}: taskType) {
      isComplete = true
    }

    const completedTasksQuantity = tasks.filter((task) => task.isComplete === true).length


  return (
    <div className={styles.container}>
      <form 
        onSubmit={handleCreateTask} 
        className={styles.taskForm}
      >
      <textarea 
        placeholder="Adicione uma nova tarefa"
        onChange={handleNewTaskChange}
        value={newTaskContent}
      />
        <button>
          <strong>Criar</strong>
          <PlusCircle size={16} />
        </button>
      </form>
      {/* Container de tasks */}
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <div>
            <p>Tarefas criadas</p>
            <span>{tasksQuantity}</span>
          </div>
          <div>
            <p className={styles.purpleText}>Concluídas</p>
            <span>{completedTasksQuantity} de {tasksQuantity}</span>
          </div>
        </header>

        {tasks.map((task) => {
          return <Task 
            key={task.id}
            id={task.id}
            content={task.content}
            deleteTask={deleteTask}
            isComplete={task.isComplete}
            switchState={switchState}
          />
        }
        )}

      </div>
    </div>
  )
}