import { connectDB } from "@/util/database.js"

import ListItem from "./listitem"

export default async function List() {
  
  const db = (await connectDB).db('crud')
  let result = await db.collection('post').find().toArray()  

  return (
    <div className="list-bg border-2 border-top"> 
      <ListItem result={result}/>
    </div>
  ) 
} 