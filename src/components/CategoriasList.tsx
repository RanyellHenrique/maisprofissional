import React from 'react';
import { FlatList } from "react-native";
import { Categoria } from '../pages/Ofertas';
import { CategoriaCard } from './index';

type Props = {
    categorias: Categoria[];
    loadingPage: () => void;
    listHeaderComponent: JSX.Element | null;
}


const CategoriasList: React.FC<Props> = ({ categorias, loadingPage, listHeaderComponent}) => {
    return (
        <FlatList
            style={{ flex: 1, padding: '2%' }}
            data={categorias}
            renderItem={({ item }) => <CategoriaCard {...item} id={item.id || 0} />}
            keyExtractor={(item) => String(item.id)}
            onEndReached={loadingPage}
            onEndReachedThreshold={0.1}
            ListHeaderComponent={listHeaderComponent}
        />
    );
}

export default CategoriasList;