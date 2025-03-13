import { useEffect, useRef, useState } from 'react';
import usePajamasStore from '../../stores/PajamasStore';
import styles from './styles.module.css';
import ProductCardStandard from '../../components/ProductCardStandard';
import PaginationCarousel from '../../components/PaginationCarousel';
import searchIcon from '../../assets/icons/search-blue.png';
import searchIconHovered from '../../assets/icons/search-blue-hovered.png';
import ImageLink from '../../components/ImageLink';

export default function PajamasPage() {
    const { pajamas, fetchPajamas, errorCode } = usePajamasStore();
    const [itemsPerRow, setItemsPerRow] = useState(4);
    const initialPage = localStorage.getItem('pajamasCurrentPage') ? parseInt(localStorage.getItem('pajamasCurrentPage')!) : 1;
    const [currentPage, setCurrentPage] = useState(initialPage);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedGender, setSelectedGender] = useState('gender-all');
    const [selectedType, setSelectedType] = useState('type-all');
    const [selectedSeason, setSelectedSeason] = useState('season-all');
    const [isInputFocused, setIsInputFocused] = useState(false);
    const itemsPerPage = 12;
    const listContainerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const cardScale = 0.9;

    useEffect(() => {
        fetchPajamas();
    }, [fetchPajamas]);

    useEffect(() => {
        const handleResize = () => {
            if (listContainerRef.current) {
                const listContainerWidth = listContainerRef.current.offsetWidth;
                const productCardWidth = 408; 
                const newItemsPerRow = Math.floor(listContainerWidth / productCardWidth);
                setItemsPerRow(newItemsPerRow);
                console.log('Items per row:', newItemsPerRow);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); 

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [cardScale]);

    const filteredPajamas = pajamas.filter(pajama => {
        const matchesSearchTerm = pajama.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesGender = selectedGender === 'gender-all' || (typeof pajama.gender === 'string' && pajama.gender.toLowerCase() === selectedGender);
        const matchesType = selectedType === 'type-all' || (typeof pajama.type === 'string' && pajama.type.toLowerCase() === selectedType);
        const matchesSeason = selectedSeason === 'season-all' || pajama.season.toLowerCase() === selectedSeason;
        return matchesSearchTerm && matchesGender && matchesType && matchesSeason;
    });

    useEffect(() => {
        if (searchTerm === '') {
            setCurrentPage(localStorage.getItem('pajamasCurrentPage') ? parseInt(localStorage.getItem('pajamasCurrentPage')!) : 1);
        } 
    }, [searchTerm]);

    useEffect(() => {
        if (selectedGender === 'gender-all') {
            setCurrentPage(localStorage.getItem('pajamasCurrentPage') ? parseInt(localStorage.getItem('pajamasCurrentPage')!) : 1);
        } else {
            setCurrentPage(1);
        } 
    }, [selectedGender]);
    
    useEffect(() => {
        if (selectedType === 'type-all') {
            setCurrentPage(localStorage.getItem('pajamasCurrentPage') ? parseInt(localStorage.getItem('pajamasCurrentPage')!) : 1);
        } else {
            setCurrentPage(1);
        } 
    }, [selectedType]);
    
    useEffect(() => {
        if (selectedSeason === 'season-all') {
            setCurrentPage(localStorage.getItem('pajamasCurrentPage') ? parseInt(localStorage.getItem('pajamasCurrentPage')!) : 1);
        } else {
            setCurrentPage(1);
        } 
    }, [selectedSeason]);



    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentPajamas = filteredPajamas.slice(startIndex, endIndex);
    const totalPages = Math.ceil(filteredPajamas.length / itemsPerPage);

    // Prevent currentPage from going out of bounds
    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [fetchPajamas, totalPages]);

    return (
        <>
            <div className={styles.searchSection}>
                <div className={styles.searchContainer}>
                    <input 
                        type="text" 
                        placeholder="Pesquise pelo produto..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        ref={inputRef}
                        onFocus={() => setIsInputFocused(true)}
                        onBlur={() => setIsInputFocused(false)}
                    />
                    <ImageLink
                        img={isInputFocused ? searchIconHovered : searchIcon}
                        alt="search"
                        width={53}
                        height={53}
                        id={styles.searchIcon}
                        onClick={() => inputRef.current?.focus()}
                    />
                </div>
                <div className={styles.filterDropdowns}>
                    <div className={styles.dropdownContainer}>
                        <div className={styles.dropdownFlair}></div>
                        <select 
                            id="dropdown" 
                            name="dropdown" 
                            className={styles.dropdown}
                            value={selectedGender}
                            onChange={(e) => setSelectedGender(e.target.value)}
                        >
                            <option value="gender-all">Gênero</option>
                            <option value="masculino">Masculino</option>
                            <option value="feminino">Feminino</option>
                            <option value="família">Família</option>
                            <option value="unissex">Unissex</option>
                        </select>
                    </div>

                    <div className={styles.dropdownContainer}>
                        <div className={styles.dropdownFlair}></div>
                        <select 
                            id="dropdown" 
                            name="dropdown" 
                            className={styles.dropdown}
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                        >
                            <div className={styles.dropdownFlair}></div>
                            <option value="type-all">Tipo</option>
                            <option value="curto">Curto</option>
                            <option value="longo">Longo</option>
                            <option value="camisola">Camisola</option>
                            <option value="short doll">Short Doll</option>
                            <option value="bermuda">Bermuda</option>
                            <option value="regata">Regata</option>
                            <option value="moletom">Moletom</option>
                            <option value="cropped">Cropped</option>
                            <option value="gestante">Gestante</option>
                            <option value="kigurumi">Kigurumi</option>
                            <option value="plush">Plush</option>
                        </select>
                    </div>

                    <div className={styles.dropdownContainer}>
                        <div className={styles.dropdownFlair}></div>
                        <select 
                            id="dropdown" 
                            name="dropdown" 
                            className={styles.dropdown}
                            value={selectedSeason}
                            onChange={(e) => setSelectedSeason(e.target.value)}
                        >
                            <div className={styles.dropdownFlair}></div>
                            <option value="season-all">Estação</option>
                            <option value="verão">Verão</option>
                            <option value="inverno">Inverno</option>
                        </select>
                    </div>

                </div>
            </div>

            <div className={styles.pajamasSection}>
                <div className={styles.pajamasList} ref={listContainerRef}>
                    <ul>
                        {(searchTerm || selectedGender !== 'gender-all' || selectedType !== 'type-all' || selectedSeason !== 'season-all') ? (
                            filteredPajamas.length === 0 ? (
                                <h1>{errorCode ? `Erro ${errorCode} ao carregar pijamas` : 'Nenhum pijama encontrado'}</h1>
                            ) : (
                                filteredPajamas.map((pajama, index) => {
                                    const rowIndex = index % itemsPerRow;
                                    return (
                                        <li key={pajama.name}>
                                            <ProductCardStandard
                                                pajama={pajama}
                                                id={styles.pajamaCard}
                                                fadeInTimeout={rowIndex * 70}
                                                itemsPerRow={itemsPerRow}
                                                scale={cardScale}
                                                fadeInThreshold={0.04}
                                            />
                                        </li>
                                    );
                                })
                            )
                        ) : (
                            currentPajamas.length === 0 ? (
                                <h1>{errorCode ? `Erro ${errorCode} ao carregar pijamas` : 'Carregando pijamas...'}</h1>
                            ) : (
                                currentPajamas.map((pajama, index) => {
                                    const rowIndex = index % itemsPerRow;
                                    return (
                                        <li key={pajama.name}>
                                            <ProductCardStandard
                                                pajama={pajama}
                                                id={styles.pajamaCard}
                                                fadeInTimeout={rowIndex * 70}
                                                itemsPerRow={itemsPerRow}
                                                scale={cardScale}
                                                fadeInThreshold={0.04}
                                            />
                                        </li>
                                    );
                                })
                            )
                        )}
                    </ul>
                </div>
                                                    
                {!(searchTerm || selectedGender !== 'gender-all' || selectedType !== 'type-all' || selectedSeason !== 'season-all') && (
                    <div className={styles.paginationCarouselContainer}>
                        <PaginationCarousel
                            totalPages={totalPages}
                            currentPage={currentPage}
                            onClickGoToPage={(value) => {
                                setCurrentPage(value);
                                localStorage.setItem('pajamasCurrentPage', value.toString());
                            }}
                        />
                    </div>
                )}
            </div>
        </>
    );
}