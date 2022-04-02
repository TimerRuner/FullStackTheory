function createProgramer(name){
  const programer = {name};
  return {
    ...programer,
    ...canCode(programer)
  }
}

function fontendProgramer(name){
  const programer = createProgramer(name);
  return {
    ...programer,
    ...canReact(programer)
  }
}
function backendProgramer(name){
  const programer = createProgramer(name);
  return {
    ...programer,
    ...canNode(programer)
  }
}


function fullstackProgramer(name){
  const programer = createProgramer(name);
  return {
    ...programer,
    ...canNode(programer),
    ...canReact(programer)
  }
}


function canNode({name}){
  return {
    node: () => console.log(`${name} can make Node code...`)
  }
}
function canReact({name}){
  return {
    react: () => console.log(`${name} can make React code...`)
  }
}
function canCode({name}){
  return {
    code: () => console.log(`${name} can make code...`)
  }
}