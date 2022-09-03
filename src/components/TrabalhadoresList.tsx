import React from 'react';
import { FlatList } from "react-native";
import { Trabalhador } from '../pages/Trabalhadores';
import { TrabalhadorCard } from './index';

type Props = {
    trabalhadores: Trabalhador[];
    loadingPage: () => void;
    listHeaderComponent: JSX.Element | null;
}


const TrabalhadoresList: React.FC<Props> = ({ trabalhadores, loadingPage, listHeaderComponent }) => {
    return (
        <FlatList
            style={{ flex: 1, padding: '2%' }}
            data={trabalhadores}
            renderItem={({ item }) => <TrabalhadorCard {...item} id={item.id || 0} />}
            keyExtractor={(item) => String(item.id)}
            onEndReached={loadingPage}
            onEndReachedThreshold={0.1}
            ListHeaderComponent={listHeaderComponent}
        />
    );
}

export default TrabalhadoresList;