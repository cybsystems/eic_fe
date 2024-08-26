import apiInstance from "@api/index";
import { Paper, Typography, Skeleton } from "@mui/material";
import { formatError, showToast } from "@utils/index";
import { useEffect, useState } from "react";

const ItemCountCard = () => {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const countRes = await apiInstance.get("items/count");
        setCount(countRes.data); // Accessing count from response
      } catch (error) {
        showToast("error", formatError(error));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <Paper
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        height: { xs: 100, sm: 140 },
      }}
    >
      {loading ? (
        <>
          <Skeleton variant="text" width={200} height={40} />
          <Skeleton variant="rectangular" width={100} height={20} sx={{ mt: 1 }} />
        </>
      ) : (
        <> 
        <Typography variant="h6">Total Inventory</Typography>
        <Typography
          variant="h4"
          sx={{ mt: 1, fontSize: { xs: "1.5rem", sm: "2rem" } }}
        >
          {count.toLocaleString()} {/* Format number with commas */}
        </Typography>
        </>
      )}
    </Paper>
  );
};

export default ItemCountCard;
