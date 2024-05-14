import {
	Pressable,
	SectionList,
	SectionListComponent,
	StyleSheet,
	View,
} from 'react-native';
import CustomText from '../CustomText';
import { FONT_BOLD, FONT_SEMI_BOLD } from '../../utils/Types';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import {
	heightPercentageToDP as hp,
	widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface ICategoryContentProperties {
	data: { title: string; data: Object[] }[];
	navigation: NativeStackNavigationProp<any, 'customer-navigation'>;
}

const renderCategoryHeader = ({ title }: { title: string }) => (
	<View style={styles.headerContainer}>
		<MaskedView
			style={styles.headerDecorator}
			maskElement={
				<CustomText
					message={title}
					styles={styles.headerText}
					variant={FONT_BOLD}
				/>
			}
		>
			<LinearGradient
				colors={['#F4A905', '#FBE437']}
				start={{ x: 0, y: 1 }}
				end={{ x: 0, y: 0 }}
				style={{ width: '100%', height: '100%' }}
			/>
		</MaskedView>
		<CustomText
			message='Xem tất cả'
			styles={styles.helperHeaderText}
			variant={FONT_SEMI_BOLD}
		/>
	</View>
);

const CategoryContent = ({ data, navigation }: ICategoryContentProperties) => {
	const renderItem = ({ item, index }: { item: any; index: number }) => (
		<View>
			<Pressable
				onPress={() => navigation.navigate('category-detail', { data: item })}
			>
				<CustomText
					message={item.name ?? item.serviceName ?? ''}
					styles={{}}
					variant={FONT_BOLD}
				/>
			</Pressable>
		</View>
	);

	return (
		<View>
			<SectionList
				showsVerticalScrollIndicator={false}
				showsHorizontalScrollIndicator={false}
				sections={data}
				keyExtractor={(item, index) => `${item}` + index}
				renderSectionHeader={({ section: { title } }) =>
					renderCategoryHeader({ title })
				}
				renderItem={({ item, index }) => renderItem({ item, index })}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	headerContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	headerDecorator: {
		width: wp(50),
		height: hp(5),
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'stretch',
	},
	headerText: {
		fontSize: hp(3.5),
	},
	helperHeaderText: {
		fontSize: hp(2),
		color: 'gray',
		height: '100%',
		textAlignVertical: 'bottom',
	},
});

export default CategoryContent;
