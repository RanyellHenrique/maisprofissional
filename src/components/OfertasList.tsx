import React from 'react';
import { FlatList } from "react-native";
import OfertaCard from './OfertaCard';
import {Oferta} from '../pages/Ofertas';

type Props = {
    ofertas: Oferta[];
    loadingPage: () => void;
    listHeaderComponent: JSX.Element | null;
}


const OfertasList: React.FC<Props> = ({ ofertas, loadingPage, listHeaderComponent}) => {
    return (
        <FlatList
            style={{flex: 1, padding: '2%'}}
            data={ofertas}
            renderItem={({ item }) => <OfertaCard {...item} id={item.id || 0} />}
            keyExtractor={(item) => String(item.id)}
            onEndReached={loadingPage}
            onEndReachedThreshold={0.1}
            ListHeaderComponent={listHeaderComponent}
        />
    );
}

export default OfertasList;