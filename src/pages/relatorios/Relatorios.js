import React, { Component } from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import RNFS from 'react-native-fs';

import Relatorio from './relatorio/Relatorio';

export default class Relatorios extends Component {
    static navigationOptions = {
        title: 'Relatórios'
    }

    state = {
        files: [],
        busy: true
    }

    componentDidMount(){
        this.onRefreshFlatList();
    }

    onRefreshFlatList = async () => {
        this.setState({ busy: true });
        try {
            let files = null;
            let db = `${RNFS.DocumentDirectoryPath}/db`

            files = await RNFS.mkdir(db);
            //files = await RNFS.writeFile(`${db}/${new Date().getTime()}.json`, '{"information": {"place": "José Malcher com Generalissimo", "date" : "' + new Date().getTime() + '"}, "data": {"sound": [12, 32, 54, 43, 45, 45, 65, 23, 43, 56, 45, 34, 54, 65, 65, 56, 56, 76, 87, 98, 98, 94, 45, 56, 76, 87, 56], "floor": [12, 23, 45, 65, 54, 23, 45, 45, 46, 47, 43, 42, 23, 45, 22, 34, 53, 23, 54, 34, 34, 35, 23]}}');
            files = await RNFS.readDir(db);

            for (let key in files){
                let data = null;
                data = await RNFS.readFile(files[key].path);
                data = await JSON.parse(data);

                files[key] = { key, data };
            }
            
            this.setState({ files, busy: false });
        }
        catch (err) {
            alert(err);
            this.setState({ busy: false });
        }
    }

    onFlatlistRenderItem = ({ item }) => (
        <Relatorio {...this.props} {...item} />
    );

    onItemSeparatorComponent = () => (
        <View style={styles.flatlistSeparator}></View>
    );

    onListEmptyComponent = () => (
        <View style={styles.flatlistEmpty}>
            <Text 
                style={styles.flatlistEmptyText}>
                    Nenhum coleta de dados encontrada
            </Text>
        </View>
    );

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    style={styles.flatlist}
                    data={this.state.files}
                    refreshing={this.state.busy}
                    renderItem={this.onFlatlistRenderItem}
                    onRefresh={this.onRefreshFlatList}
                    ItemSeparatorComponent={this.onItemSeparatorComponent}
                    ListEmptyComponent={this.onListEmptyComponent}
                /> 
            </View>
        );
    }   
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    flatlist: {
        flex: 1
    },

    flatlistSeparator: {
        height: 1,
        borderBottomWidth: .5,
        borderBottomColor: 'gray'
    },

    flatlistEmpty: {
        alignItems: 'center',
        justifyContent: 'center'
    },

    flatlistEmptyText: {
        fontSize: 14,
        fontWeight: '400'
    }
});