import { AppBar, Tab, Tabs, List, ListItem, Divider } from '@material-ui/core';
import { useState, useEffect } from 'react';
import { Layout } from '../components/index';
import { useRouter } from 'next/router';

const getSchedules = () => {
	const days = ['일', '월', '화', '수', '목', '금', '토'];
	const [day, month, date] = [[], [], []];
	for (let i = 0; i < 30; i++) {
		const today = new Date();
		today.setDate(today.getDate() + i);
		day.push(days[today.getDay()]);
		month.push(today.getMonth() + 1);
		date.push(today.getDate());
	}
	return [day, month, date];
};
function a11yProps(index: any) {
	return {
		id: `scrollable-auto-tab-${index}`,
		'aria-controls': `scrollable-auto-tabpanel-${index}`,
	};
}
interface TabPanelProps {
	children?: React.ReactNode;
	index: any;
	value: any;
}
function TabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`scrollable-auto-tabpanel-${index}`}
			aria-labelledby={`scrollable-auto-tab-${index}`}
			{...other}
		>
			{value === index && children}
		</div>
	);
}
const schedules = () => {
	const [day, month, date] = getSchedules();
	const [value, setValue] = useState(0);
	const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
		setValue(newValue);
	};
	const router = useRouter();
	const [num, setNum] = useState(null);
	useEffect(() => {
		if (!router.isReady) return;
		console.log(router.query);
		setNum(router.query.movie_num);
	}, [router.isReady]);
	return (
		<Layout>
			<div id="schedules-container">
				<h1 id="schedules-title">{num ? '특정 ' : '전체 '}상영일정</h1>
				<AppBar position="static" color="default">
					<Tabs
						value={value}
						onChange={handleChange}
						indicatorColor="primary"
						textColor="primary"
						variant="scrollable"
						scrollButtons="auto"
						aria-label="scrollable auto tabs example"
					>
						{date.map((_, idx) => (
							<Tab
								key={day[idx] + month[idx] + date[idx]}
								style={{ fontWeight: 'bold' }}
								label={`${day[idx]}/${month[idx]}/${date[idx]}`}
								{...a11yProps({ idx })}
							/>
						))}
					</Tabs>
					{date.map((_, idx) => (
						<TabPanel value={value} index={idx} key={day[idx] + month[idx] + date[idx]}>
							<List
								className="schedules-list"
								style={{ padding: '0 0', margin: '0 auto' }}
								component="nav"
							>
								<div>
									<ListItem style={{ padding: '0 10px' }} button>
										<p>d</p>
									</ListItem>
									<Divider />
								</div>
							</List>
						</TabPanel>
					))}
				</AppBar>
			</div>
		</Layout>
	);
};

export default schedules;
