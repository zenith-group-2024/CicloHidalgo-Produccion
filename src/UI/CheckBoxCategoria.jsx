import { useState, useEffect, useCallback } from "react";
import { useFetchProductosFiltro } from "../../hooks/FetchFiltros"; 

const CheckBoxCategoria = ({ onCategoryChange, onBrandChange, onSubCategoryChange }) => {
    const { categorias, isLoading } = useFetchProductosFiltro();
    
    const [selectedCategories, setSelectedCategories] = useState({});
    const [selectedSubCategories, setSelectedSubCategories] = useState({});
    const [selectedBrands, setSelectedBrands] = useState({});

    const handleCategoryChange = (event) => {
        const { name, checked } = event.target;
        setSelectedCategories(prev => ({
            ...prev,
            [name]: checked
        }));
    };

    useEffect(() => {
        document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
            const { value, name } = checkbox;
            checkbox.checked =
                (name === "categoria" && selectedCategories.includes(value)) ||
                (name === "subcategoria" && selectedSubCategories.includes(value)) ||
                (name === "marca" && selectedBrands.includes(value));
        });
    }, [selectedCategories, selectedSubCategories, selectedBrands]);

    const handleSubCategoryChange = (event) => {
        const { name, checked } = event.target;
        setSelectedSubCategories(prev => ({
            ...prev,
            [name]: checked
        }));
    };

    const handleBrandChange = (event) => {
        const { name, checked } = event.target;
        setSelectedBrands(prev => ({
            ...prev,
            [name]: checked
        }));
    };

    const updateCategories = useCallback(() => {
        const updatedCategories = Object.keys(selectedCategories).filter(key => selectedCategories[key]);
        onCategoryChange(updatedCategories);
    }, [selectedCategories, onCategoryChange]);

    const updateSubCategories = useCallback(() => {
        const updatedSubCategories = Object.keys(selectedSubCategories).filter(key => selectedSubCategories[key]);
        onSubCategoryChange(updatedSubCategories);
    }, [selectedSubCategories, onSubCategoryChange]);

    const updateBrands = useCallback(() => {
        const updatedBrands = Object.keys(selectedBrands).filter(key => selectedBrands[key]);
        onBrandChange(updatedBrands);
    }, [selectedBrands, onBrandChange]);

    useEffect(() => {
        updateCategories();
    }, [selectedCategories, updateCategories]);

    useEffect(() => {
        updateSubCategories();
    }, [selectedSubCategories, updateSubCategories]);

    useEffect(() => {
        updateBrands();
    }, [selectedBrands, updateBrands]);

    const getSubCategoriesForSelected = () => {
        const combinedSubCategories = Object.keys(selectedCategories)
            .filter(category => selectedCategories[category] && categorias[category])
            .flatMap(category => categorias[category].subcategories);

        return Array.from(new Set(combinedSubCategories));
    };

    const getBrandsForSelected = () => {
        const combinedBrands = Object.keys(selectedCategories)
            .filter(category => selectedCategories[category] && categorias[category])
            .flatMap(category => categorias[category].brands);

        return Array.from(new Set(combinedBrands));
    };

    const resetFilters = () => {
        setSelectedCategories({});
        setSelectedSubCategories({});
        setSelectedBrands({});
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <div className="text-black w-full mb-4 font-secondary font-bold">Categoría</div>
                {Object.keys(categorias).map((category) => (
                    <div key={category}>
                        <input
                            type="checkbox"
                            name={category}
                            checked={selectedCategories[category] || false}
                            onChange={handleCategoryChange}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label htmlFor={category} className="text-gray-700 ml-2">
                            {categorias[category].label}
                        </label>
                    </div>
                ))}
            </div>

            <div className="space-y-2">
                <div className="text-black w-full mb-4 font-secondary font-bold">Subcategoría</div>
                {getSubCategoriesForSelected().map((subCategory) => (
                    <div key={subCategory}>
                        <input
                            type="checkbox"
                            name={subCategory}
                            checked={selectedSubCategories[subCategory] || false}
                            onChange={handleSubCategoryChange}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label htmlFor={subCategory} className="text-gray-700 ml-2">
                            {subCategory}
                        </label>
                    </div>
                ))}
            </div>

            <div className="space-y-2">
                <div className="text-black w-full mb-4 font-secondary font-bold">Marca</div>
                {getBrandsForSelected().map((brand) => (
                    <div key={brand}>
                        <input
                            type="checkbox"
                            name={brand}
                            checked={selectedBrands[brand] || false}
                            onChange={handleBrandChange}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label htmlFor={brand} className="text-gray-700 ml-2">
                            {brand}
                        </label>
                    </div>
                ))}
            </div>

            <button
                onClick={resetFilters}
                className="p-2 border-2 border-old text-old rounded-lg focus:outline-none transform transition-transform duration-300 hover:scale-105"

            >
                Limpiar Filtros
            </button>
        </div>
    );
};

export default CheckBoxCategoria;
