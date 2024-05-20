import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './detalhe.css';

import api from '../../services/api';

function Filme(){

    const { id } = useParams();
    const navigate = useNavigate();

    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function loadFilme(){
            await api.get(`/movie/${id}`,{
                params:{
                    api_key: process.env.REACT_APP_API_KEY,
                    language: 'pt-BR',
                }
            })
            .then((response) => {
                setFilme(response.data);
                setLoading(false);
            })
            .catch(()=>{
                console.log("Filme não encontrado");
                navigate('/', { replace: true });
                return;
            })
        }
        loadFilme()
        
        return () => {
            console.log("Componente foi desmontado");
        }
        
    }, [navigate, id])

    function salvarFilme(){

        const minhaLista = localStorage.getItem('@primefilmes');
 
        let filmesSalvos = JSON.parse(minhaLista) || [];

        const hasFilme = filmesSalvos.some( (filmesSalvo) => filmesSalvo.id === filme.id);

        if (hasFilme){
            toast.warning('Esse filme já está na sua lista');
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem('@primefilmes', JSON.stringify(filmesSalvos));
        toast.success('Filme salvo com sucesso!');

    }
    
    if(loading){
        return(
            <div className='filme-info'>
                <h1>Carregando detalhes...</h1>
            </div>
        );
    }

    return(
        <div className='filme-info'>
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title}/>
            <h3>Sinopse:</h3>
            <span>{filme.overview}</span>
        
            <div className='area-buttons'>
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a target='_blank'
                    rel='external' 
                    href={`https://youtube.com/results?search_query=${filme.title} Trailer`}
                    >
                    Trailer</a>
                </button>
            </div>
        </div>
    );
}

export default Filme;