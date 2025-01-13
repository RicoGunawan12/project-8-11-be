const Warehouse = sequelize.define("warehouse", {
  warehouseId: {
    field: "warehouse_id",
    type: DataTypes.UUID,
  },
});
