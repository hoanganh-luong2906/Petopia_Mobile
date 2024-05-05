import { LinearGradient } from 'expo-linear-gradient';
import { Image, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { FONT_BOLD, FONT_REGULAR, FONT_SEMI_BOLD, IAppointment } from '../../utils/Types';
import CustomText from '../CustomText';

const extractDate = (dateString: string): string => {
	const date = new Date(dateString);
	const day = date.getDate();
	const month = date.getMonth() + 1;
	return `${day}/${month}`;
};

const extractTime = (dateString: string): string => {
	const date = new Date(dateString);
	const hours = date.getHours();
	const minutes = date.getMinutes();
	return `${hours.toString().padStart(2, '0')}:${minutes.toFixed(0).padStart(2, '0')}`;
};

const AppointmentContent = ({
	appointment,
	index,
}: {
	appointment: IAppointment;
	index: number;
}) => {
	return (
		<View style={styles.appointmentContainer}>
			<View style={styles.timeContainer}>
				<CustomText
					message={extractDate(appointment.date)}
					styles={styles.timeDate}
					variant={FONT_BOLD}
				/>
				<CustomText
					message={extractTime(appointment.date)}
					styles={styles.timeHours}
					variant={FONT_REGULAR}
				/>
			</View>
			<View
				style={[
					styles.spotContainer,
					index === 0 ? { padding: 0 } : { padding: 3 },
				]}
			>
				<View style={styles.spot}>
					<LinearGradient
						colors={['#F4A905', '#FBE437']}
						start={{ x: 0, y: 0 }}
						end={{ x: 1, y: 0 }}
						style={styles.spot}
					>
						<View style={styles.spot}>
							{index === 0 && (
								<LinearGradient
									colors={['#F4A905', '#FBE437']}
									start={{ x: 0, y: 0 }}
									end={{ x: 1, y: 0 }}
									style={styles.spot}
								/>
							)}
						</View>
					</LinearGradient>
				</View>
			</View>
			<View style={styles.summaryContainer}>
				{index === 0 && (
					<LinearGradient
						colors={['#F4A905', '#FBE437']}
						start={{ x: 0, y: 1 }}
						end={{ x: 0, y: 0 }}
						style={styles.linearSummaryContent}
					/>
				)}
				<View style={styles.summaryContent}>
					<CustomText
						numberOfLines={1}
						message={appointment.report ?? 'Không xác định'}
						styles={[
							styles.appointmentTitle,
							index === 0 && { color: 'white' },
						]}
						variant={FONT_SEMI_BOLD}
					/>
					<View>
						<View style={styles.appointmentPlace}>
							<Icon
								name='home'
								size={20}
								color={index === 0 ? 'white' : 'black'}
							/>
							<CustomText
								numberOfLines={1}
								message={appointment.place ?? 'Không xác định'}
								styles={[
									styles.appointmentText,
									index === 0 && { color: 'white' },
								]}
								variant={FONT_SEMI_BOLD}
							/>
						</View>
						<View style={styles.appointmentPlace}>
							<Image
								src={appointment.doctor.avatarLink}
								resizeMode='contain'
								style={[
									styles.doctorAvt,
									index === 0
										? { borderColor: 'white' }
										: { borderColor: 'lightgray' },
								]}
							/>
							<CustomText
								numberOfLines={1}
								message={appointment.doctor.name ?? 'Không xác định'}
								styles={[
									styles.appointmentText,
									index === 0 && { color: 'white' },
								]}
								variant={FONT_REGULAR}
							/>
						</View>
					</View>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	appointmentContainer: {
		width: '100%',
		height: 130,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'stretch',
		marginVertical: 10,
	},
	timeContainer: {
		width: '18%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'flex-end',
		paddingRight: '2%',
	},
	timeDate: {
		fontSize: 22,
		letterSpacing: 2,
		color: 'black',
	},
	timeHours: {
		fontSize: 18,
		color: 'gray',
		lineHeight: 22,
	},
	spotContainer: {
		width: 28,
		height: 28,
		borderRadius: 15,
	},
	spot: {
		width: '100%',
		height: '100%',
		backgroundColor: 'white',
		padding: 3,
		borderRadius: 15,
	},
	summaryContainer: {
		position: 'relative',
		width: '70%',
		backgroundColor: 'white',
		borderRadius: 8,
		marginLeft: '2%',
		overflow: 'hidden',
		marginHorizontal: 5,
		marginRight: 5,
		elevation: 2,
	},
	linearSummaryContent: {
		width: '100%',
		height: '100%',
		position: 'absolute',
		top: 0,
		left: 0,
	},
	summaryContent: {
		width: '100%',
		height: '100%',
		padding: 10,
		display: 'flex',
		justifyContent: 'space-between',
	},
	appointmentTitle: {
		fontSize: 18,
		width: '100%',
	},
	appointmentPlace: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'stretch',
	},
	appointmentText: {
		fontSize: 16,
		lineHeight: 20,
		textAlignVertical: 'bottom',
		paddingTop: '2%',
		paddingLeft: '5%',
	},
	doctorAvt: {
		width: 22,
		height: 22,
		borderRadius: 15,
		borderWidth: 2,
	},
});

export default AppointmentContent;