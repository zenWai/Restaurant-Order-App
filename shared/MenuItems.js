import {Alert, View, StyleSheet, Text, FlatList, Image} from "react-native";
import React, {useCallback, useEffect, useMemo, useState} from "react";
import {createTable, filterByQueryAndCategories, getMenuItems, saveMenuItems} from "../database";
import {getSectionListData, useUpdateEffect} from "../utils";
import Filters from "./Filters";
import debounce from 'lodash.debounce';
import {Searchbar} from "react-native-paper";
import HeroSection from "./HeroSection";

const API_URL =
    'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json';
const API_BASE_URL =
    'https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/';
//FILTERS
const sections = ['starters', 'mains', 'desserts'];

//ITEMS

const Item = ({ item }) => {
    return (
        <View style={styles.item}>
            <View style={styles.details}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.description}>
                    {item.description && item.description.length > 40
                        ? item.description.substring(0, 40) + '...'
                        : item.description}
                </Text>
                <Text style={styles.price}>${item.price}</Text>
            </View>
            <Image
                style={styles.image}
                source={{ uri: `${API_BASE_URL}${item.image}?raw=true` }}
            />
        </View>
    );
};
function MenuItems() {
    const [data, setData] = useState([]);
    const [searchBarText, setSearchBarText] = useState('');
    const [query, setQuery] = useState('');
    const [filterSelections, setFilterSelections] = useState(
        sections.map(() => false)
    );

    const fetchData = async() => {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            return data.menu.map(item => ({
                ...item,
            }));
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    useEffect(() => {
        (async () => {
            try {
                await createTable();
                let menuItems = await getMenuItems();

                // The application only fetches the menu data once from a remote URL
                // and then stores it into a SQLite database.
                // After that, every application restart loads the menu from the database
                // If no menuItems in database, fetch them from the API
                if (!menuItems.length) {
                    menuItems = await fetchData();
                    await saveMenuItems(menuItems);
                    menuItems = await getMenuItems();
                }

                const sectionListData = getSectionListData(menuItems);
                setData(sectionListData);
            } catch (e) {
                Alert.alert(e.message);
            }
        })();
    }, []);

    useUpdateEffect(() => {
        (async () => {
            const activeCategories = sections.filter((s, i) => {
                // If all filters are deselected, all categories are active
                if (filterSelections.every((item) => item === false)) {
                    return true;
                }
                return filterSelections[i];
            });
            try {
                const menuItems = await filterByQueryAndCategories(query, activeCategories);
                const sectionListData = getSectionListData(menuItems);
                setData(sectionListData);
            } catch (e) {
                Alert.alert(e.message);
            }
        })();
    }, [filterSelections, query]);

    const lookup = useCallback((q) => {
        setQuery(q);
    }, []);

    const debouncedLookup = useMemo(() => debounce(lookup, 500), [lookup]);

    const handleSearchChange = (text) => {
        setSearchBarText(text);
        debouncedLookup(text);
    };

    const handleFiltersChange = async (index) => {
        const arrayCopy = [...filterSelections];
        arrayCopy[index] = !filterSelections[index];
        setFilterSelections(arrayCopy);
    };
    console.log('Data:', data);

return (
    <View style={styles.container}>
        <HeroSection />
        <Searchbar
            placeholder="Search"
            placeholderTextColor="white"
            onChangeText={handleSearchChange}
            value={searchBarText}
            style={styles.searchBar}
            iconColor="white"
            inputStyle={{ color: 'white' }}
            mode={"view"}
        />
        <Filters
            selections={filterSelections}
            onChange={handleFiltersChange}
            sections={sections}
        />
        <FlatList
            style={styles.sectionList}
            data={data.flatMap((section) => section.data)}
            keyExtractor={(item) => item.uuid}
            renderItem={({ item }) => <Item item={item} />}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
    </View>
);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    sectionList: {
        paddingHorizontal: 16,
    },
    searchBar: {
        backgroundColor: '#495E57',
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
    },
    separator: {
        height: 1,
        backgroundColor: 'gray',
    },
    image: {
        width: 80,
        height: 80,
        marginRight: 16,
    },
    details: {
        flex: 1,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 4,
        color: 'black',
    },
    description: {
        fontSize: 14,
        marginBottom: 4,
        color: '#495E57',
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#495E57',
    },
});

export default MenuItems;