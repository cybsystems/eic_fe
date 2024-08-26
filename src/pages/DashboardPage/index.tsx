import PageGridContainer from "@components/atoms/PageGridContainer";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Chart from "./Chart"; // Assume this is a custom chart component
import InventoryTable from "./InventoryTable"; // Assume this is a custom table component
import OrdersTable from "./OrdersTable"; // Assume this is a custom table component
import ItemCountCard from "./ItemCountCard";

const Dashboard = () => {
  return (
    <PageGridContainer>
      <Grid container spacing={2}>
        {/* Total Inventory Card */}
        <Grid item xs={12} sm={6} md={3}>
           <ItemCountCard/>
        </Grid>

        {/* Orders Today Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: { xs: 100, sm: 140 },
            }}
          >
            <Typography variant="h6">Orders Today</Typography>
            <Typography
              variant="h4"
              sx={{ mt: 1, fontSize: { xs: "1.5rem", sm: "2rem" } }}
            >
              120
            </Typography>
          </Paper>
        </Grid>

        {/* Low Stock Items Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: { xs: 100, sm: 140 },
            }}
          >
            <Typography variant="h6">Low Stock Items</Typography>
            <Typography
              variant="h4"
              sx={{ mt: 1, fontSize: { xs: "1.5rem", sm: "2rem" } }}
            >
              32
            </Typography>
          </Paper>
        </Grid>

        {/* Pending Shipments Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: { xs: 100, sm: 140 },
            }}
          >
            <Typography variant="h6">Pending Shipments</Typography>
            <Typography
              variant="h4"
              sx={{ mt: 1, fontSize: { xs: "1.5rem", sm: "2rem" } }}
            >
              45
            </Typography>
          </Paper>
        </Grid>

        {/* Inventory Status Chart */}
        <Grid item xs={12} md={8}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: { xs: 250, sm: 300 },
            }}
          >
            <Typography variant="h6" gutterBottom>
              Inventory Status
            </Typography>
            <Chart /> {/* Custom chart component */}
          </Paper>
        </Grid>

        {/* Recent Orders Table */}
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: { xs: 250, sm: 300 },
            }}
          >
            <Typography variant="h6" gutterBottom>
              Recent Orders
            </Typography>
            <OrdersTable /> {/* Custom table component */}
          </Paper>
        </Grid>

        {/* Inventory Table */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Inventory List
            </Typography>
            <InventoryTable /> {/* Custom table component */}
          </Paper>
        </Grid>
      </Grid>
    </PageGridContainer>
  );
};

export default Dashboard;
