import React from 'react';
import { FlatList } from "react-native";
import { Proposta } from '../pages/Propostas';
import { PropostaCard } from './index';

type Props = {
    propostas: Proposta[];
    loadingPage: () => void;
}


const PropostasList: React.FC<Props> = ({ propostas, loadingPage}) => {
    return (
        <FlatList
            style={{ flex: 1, padding: '2%' }}
            data={propostas}
            renderItem={({ item }) => <PropostaCard {...item} id={item.id || 0} />}
            keyExtractor={(item) => String(item.id)}
            onEndReached={loadingPage}
            onEndReachedThreshold={0.1}
        />
    );
}

export default PropostasList;