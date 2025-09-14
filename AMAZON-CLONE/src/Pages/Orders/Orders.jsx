import React from "react";
import { useEffect, useContext, useState } from "react";
import LayOut from "../../components/LayOut/LayOut";
import { db } from "../../Utility/firebase";
import { DataContext } from "../../components/DataProvider/DataProvider";
import ProductCard from "../../components/Product/ProductCard";
import "./Orders.css";

function Orders() {
  // eslint-disable-next-line no-unused-vars
  const [{ user }, dispatch] = useContext(DataContext);

  // eslint-disable-next-line no-unused-vars
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user?.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) =>
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
    } else {
      setOrders([]);
    }
  }, [user]);

  return (
    <LayOut>
      <section>
        <div className="orders-page">
          <div className="orders-page-title">Your Orders</div>
          <div className="orders-container">
            {orders?.map((eachOrder, i) => (
              <div className="order-card" key={i}>
                <hr className="order-divider" />
                <div className="order-header">
                  <p className="order-id">Order ID: {eachOrder?.id}</p>
                </div>
                <div className="order-items-container">
                  {eachOrder?.data?.basket?.map((order) => (
                    <ProductCard flex={true} key={order?.id} product={order} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Orders;
