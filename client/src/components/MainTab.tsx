import { AppBar, Tabs, Tab, Typography, Box } from "@material-ui/core";
import { useState } from "react";

function TabPanel(props:any) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }


const MainTab: React.FC<any> = (props) => {

    const [tab, setTab] = useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setTab(newValue);
    };

    return (
        <div>
            <AppBar>
                <Tabs onChange={handleChange}>
                    <Tab label="경영현황" />
                    <Tab label="연구개발" />
                    <Tab label="제품생산" />
                    <Tab label="재료구매" />
                    <Tab label="제품판매" />
                </Tabs>
            </AppBar>
            <TabPanel value={tab} index={0}>
                Item One
            </TabPanel>
            <TabPanel value={tab} index={1}>
                Item Two
            </TabPanel>
            <TabPanel value={tab} index={2}>
                Item Three
            </TabPanel>
            <TabPanel value={tab} index={3}>
                Item Four
            </TabPanel>
            <TabPanel value={tab} index={4}>
                Item Five
            </TabPanel>
        </div>


    )
}


export default MainTab;