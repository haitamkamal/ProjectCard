import { useState, useEffect } from 'react';
import './style.css';

function App() {
  const [pokemonImages, setPokemonImages] = useState([]);
  const [clickedImages, setClickedImages] = useState([]); // Tracks clicked image indices
  const [score, setScore] = useState(0); // Score state to trigger re-renders

  function generateUniqueRandomArray() {
    const arr = [];
    const numbers = Array.from({ length: 12 }, (_, index) => index + 1); // IDs from 1 to 12
    while (numbers.length) {
      const randomIndex = Math.floor(Math.random() * numbers.length);
      arr.push(numbers.splice(randomIndex, 1)[0]);
    }
    return arr;
  }

  const randomArr = generateUniqueRandomArray();

  const fetchData = async () => {
    try {
      let images = [];
      for (let i = 0; i < 12; i++) {
        let id = randomArr[i];
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await response.json();
        const sprite = data.sprites.front_default;

        if (sprite) {
          images.push(sprite);
        } else {
          images.push('https://via.placeholder.com/150?text=No+Image');
        }
      }
      setPokemonImages(images);
    } catch (error) {
      console.error('Error fetching Pokémon data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  function playGame(index) {
    if (clickedImages.includes(index)) {
      console.log("You lose!");
      setScore(0);
      setClickedImages([]);
    } else {
      setClickedImages([...clickedImages, index]);
      setScore(score + 1);
      console.log(`Score: ${score + 1}`);
    }
  }

  return (
    <>
      <div className="container">
        {pokemonImages.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`pokemon-${index + 1}`}
            className="element"
            onClick={() => playGame(index)}
          />
        ))}
      </div>
      <div className="score-board">
        <p>Score: {score}</p>
      </div>
    </>
  );
}

export default App;
