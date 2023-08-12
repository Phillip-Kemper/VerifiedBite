
interface Restaurant {
    id: number;
    name: string;
    imageURL: string; 
}

export const restaurants: Array<Restaurant> = [
    {id: 1, name: "Star Pizza", imageURL: "https://source.unsplash.com/60nzTP7_hMQ"},
    {id: 4, name: "Top Pho", imageURL: "https://source.unsplash.com/NFQi_2HUNRI"},
    {id: 2, name: "Burger Palace", imageURL: "https://source.unsplash.com/I7A_pHLcQK8"},
    {id: 5, name: "Elite Sushi", imageURL: "https://source.unsplash.com/O2yNzXdqOu0"},
    {id: 3, name: "Wiener Stuben", imageURL: "https://source.unsplash.com/MyfbM2QYF4o"},
]

export const getRestaurantById = (id: number) => {
    return restaurants.find((r) => r.id === id)
}