import { useState, useEffect } from 'react';
import { getPokemonDetails } from '../services/pokemonService';

const TYPE_COLORS = {
  normal: '#A8A77A',
  fire: '#EE8130',
  water: '#6390F0',
  electric: '#F7D02C',
  grass: '#7AC74C',
  ice: '#96D9D6',
  fighting: '#C22E28',
  poison: '#A33EA1',
  ground: '#E2BF65',
  flying: '#A98FF3',
  psychic: '#F95587',
  bug: '#A6B91A',
  rock: '#B6A136',
  ghost: '#735797',
  dragon: '#6F35FC',
  dark: '#705746',
  steel: '#B7B7CE',
  fairy: '#D685AD',
};

function PokemonCard({ pokemonName }) {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const loadDetails = async () => {
      try {
        setLoading(true);
        const data = await getPokemonDetails(pokemonName);
        setPokemon(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadDetails();
  }, [pokemonName]);

  if (loading) return <div style={cardStyle}>Cargando registro...</div>;
  if (!pokemon) return null;

  return (
    <div
      style={{
        ...cardStyle,
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: isHovered
          ? '0 8px 20px rgba(0, 255, 255, 0.35)'
          : '0 2px 8px rgba(0, 0, 0, 0.4)',
        borderColor: isHovered ? '#0ff' : 'transparent',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        style={{ width: '100px', height: '100px' }}
      />
      <h3 style={{ textTransform: 'capitalize', margin: '8px 0 10px', fontSize: '1rem' }}>
        <span style={{ color: '#0ff', fontSize: '0.85em', marginRight: '4px' }}>#{String(pokemon.id).padStart(3, '0')}</span>
        {pokemon.name}
      </h3>
      <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '10px' }}>
        {pokemon.types.map((t) => {
          const typeName = t.type.name;
          const bg = TYPE_COLORS[typeName] || '#777';
          return (
            <span
              key={typeName}
              style={{
                backgroundColor: bg,
                color: '#fff',
                padding: '3px 8px',
                borderRadius: '10px',
                fontSize: '0.7rem',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                boxShadow: `0 2px 6px ${bg}55`,
              }}
            >
              {typeName}
            </span>
          );
        })}
      </div>
      <p>
        <strong>HP:</strong> {pokemon.stats[0].base_stat} | <strong>Ataque:</strong>{' '}
        {pokemon.stats[1].base_stat}
      </p>
    </div>
  );
}

const cardStyle = {
  border: '2px solid transparent',
  borderRadius: '15px',
  padding: '15px',
  margin: '10px',
  width: '180px',
  textAlign: 'center',
  backgroundColor: '#1a1a24',
  color: '#e2e8f0',
  cursor: 'pointer',
  transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease'
};

export default PokemonCard;
