
import AddTask from "./components/AddTask";
import TodoList from "./components/TodoList";

export default async function Home() {
 
  return (

    <main className=" max-w-2xl mx-auto ">
      <div className="text-center my-5 flex flex-col gap-4 ">
        <h1 className="text-2xl font-bold ">Todo List App</h1>
        <AddTask />
      </div>
      <TodoList/>
    </main>

  )
}
