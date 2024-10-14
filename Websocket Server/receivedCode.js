const TestT = (props) => {
  const { Card, CardContent, CardActions, Grid } = Materio;
  const [result, setResult] = useState(0);

  return (
    <div>
      <Card>
        <CardContent> Result: {result} </CardContent>
        <CardActions>
          <Grid container spacing={1}>
            {["7", "8", "9", "4", "5", "6", "1", "2", "3", "0"].map(
              (num, index) => (
                <Grid item xs={4} key={index}>
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={() => handleNumberClick(num)}
                    style={{ height: "60px", fontSize: "24px" }}
                  >
                    {num}
                  </Button>
                </Grid>
              )
            )}
          </Grid>
          <Grid item xs={4}>
            <Grid container spacing={1} direction="column">
              <Grid item>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => handleOperation("add")}
                  style={{
                    height: "60px",
                    fontSize: "24px",
                    backgroundColor: "#ff9500",
                    color: "#fff",
                  }}
                >
                  Test
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </div>
  );
};
