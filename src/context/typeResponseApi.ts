interface types{
    type: type
}
interface type{
    name: string
}
interface stats{
    base_stat: number
}
export default interface typeResponseApi{
    height: number, 
    weight: number, 
    abilities: string,
    id: number, 
    name: string, 
    sprites: string, 
    types: types[], 
    stats: stats[], 
    shape: string, 
    generation: string
}