
interface Restaurant {
    id: number;
    name: string;
    imageURL: string; 
}

export const restaurants: Array<Restaurant> = [
    {id: 1, name: "Star Pizza", imageURL: "https://source.unsplash.com/60nzTP7_hMQ"},
    {id: 2, name: "Burger Palace", imageURL: "https://source.unsplash.com/I7A_pHLcQK8"},
    {id: 3, name: "Burger Palace", imageURL: "https://source.unsplash.com/I7A_pHLcQK8"},
    {id: 4, name: "Burger Palace", imageURL: "https://source.unsplash.com/I7A_pHLcQK8"},
    {id: 5, name: "Burger Palace", imageURL: "https://source.unsplash.com/I7A_pHLcQK8"},
]

export const getRestaurantById = (id: number) => {
    return restaurants.find((r) => r.id === id)
}