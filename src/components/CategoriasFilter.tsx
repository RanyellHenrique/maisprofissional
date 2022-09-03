import React, { useState } from "react";
import { View } from "react-native";
import { Categoria } from "../pages/Ofertas";
import { colors } from '../styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';


type Props = {
    categorias: Categoria[];
    setCategorias: Function;
    categoriaChange: Function;
}


const GenreFilter: React.FC<Props> = ({ categorias, setCategorias, categoriaChange }) => {

    const [categoriasSelected, setCategoriasSelected] = useState<Number[]>([]);


    const onSelectedCategoriasChange = (categorias: Number[]) => {
        setCategoriasSelected([ ...categorias]);
        setCategorias({ id: categorias.shift() });
        categoriaChange();
    };

    return (
        <View>
            <SectionedMultiSelect
                items={categorias}
                IconRenderer={Icon}
                uniqueKey="id"
                searchPlaceholderText="Buscar categoria"
                confirmText="Confirmar"
                displayKey="nome"
                selectText="Escolha uma categoria"
                showDropDowns={true}
                onSelectedItemsChange={onSelectedCategoriasChange}
                single
                selectedItems={categoriasSelected}
                styles={{
                    selectedItemText: { color: colors.primary },
                    selectToggleText: { color: colors.mediumGray },
                    button: { backgroundColor: colors.primary },
                    itemText: { color: colors.mediumGray }

                }}
            />
        </View>
    );
}

export default GenreFilter;