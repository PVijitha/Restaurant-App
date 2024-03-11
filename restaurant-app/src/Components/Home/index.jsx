import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import {MainDishes} from "./MainDishes";
import {SideDishes} from "./SideDishes";
import {Drinks} from "./Drinks";
import {Search} from "./Search";
import {Footer} from "./Footer";
import {itemsData} from "../Items.data";
import { Header } from "./Header";

function Home() {
  const navigate = useNavigate();
  const [addItem, setAddItem] = useState([]);
  const [price, setPrice] = useState(0.0);
  const [updatedDishes, setUpdatedDishes] = useState(itemsData);
  const [search, setSearch] = useState("");

  useEffect(() => {
    cartExist();
    getLocalStorageData();
  }, []);

  function cartExist() {
    const cartFoods = JSON.parse(localStorage.getItem("UpdatedDishes")) || [];
    if (cartFoods.length > 0) {
      setUpdatedDishes(cartFoods);
    }
  }

  function getLocalStorageData() {
    const storedItems = localStorage.getItem("Items");
    if (storedItems) {
      const parsedItems = JSON.parse(storedItems);
      const totalPrice = parsedItems.reduce((acc, item) => acc + item.price, 0);
      const roundedTotalPrice = Math.round(totalPrice * 100) / 100;
      setAddItem(() => {
        return parsedItems;
      });
      setPrice(roundedTotalPrice);
    }
  }

  function setLocalStorageData(addItem, price) {
    localStorage.setItem("Items", JSON.stringify(addItem));
    localStorage.setItem("Total", price);
    localStorage.setItem("UpdatedDishes", JSON.stringify(updatedDishes));
  }

  function onCart() {
    setLocalStorageData(addItem, price);
    cartExist();
    navigate(`cart`);
  }

  function incrQty(selectedItem) {
    const itemIndex = addItem.findIndex((item) => item.id === selectedItem.id);
    const newItem = updatedDishes.map((item) =>
      item.id === selectedItem.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    setUpdatedDishes(newItem);
    const totalPrice = parseFloat(price) + parseFloat(selectedItem.price);
    setPrice(totalPrice.toFixed(2));
    if (itemIndex !== -1) {
      setAddItem((addItem) =>
        addItem.map((item) =>
          item.id === selectedItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setAddItem((addItem) => [...addItem, { ...selectedItem, quantity: 1 }]);
    }
  }

  const decQty = (selectedItem) => {
    const itemIndex = addItem.findIndex(
      (addItem) => addItem.id === selectedItem.id
    );
    if (selectedItem.quantity > 0) {
      let newItem;
      newItem = updatedDishes.map((item) =>
        item.id === selectedItem.id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      setUpdatedDishes(newItem);
      const totalPrice = parseFloat(price) - parseFloat(selectedItem.price);
      setPrice(totalPrice.toFixed(2));
      const updatedItems = [...addItem];
      updatedItems[itemIndex] = {
        ...selectedItem,
        quantity: selectedItem.quantity - 1,
      };
      if (updatedItems[itemIndex].quantity === 0) {
        updatedItems.splice(itemIndex, 1);
      }
      setAddItem(updatedItems);
    }
  };

  function resetSearch() {
     if (addItem.length > 0) {
      const updatedDishesCopy = [...itemsData];
      for (const item of addItem) {
        const matchingDishIndex = updatedDishesCopy.findIndex(
          (dish) => dish.id === item.id
        );
        if (matchingDishIndex !== -1) {
          updatedDishesCopy[matchingDishIndex].quantity = item.quantity;
        }
      }
      setUpdatedDishes(updatedDishesCopy);
    }
  }

  function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  }

  function searchItem(item) {
    let mainList = [];
    if (item === "") {
      mainList = [...itemsData];
      resetSearch();
    } else {
      const filteredList = itemsData.filter((dish) =>
        dish.title.toLowerCase().includes(item.toLowerCase())
      );
      mainList = [...filteredList];
        const updatedDishesCopy = [...filteredList];
        for (const item of addItem) {
          const matchingDishIndex = updatedDishesCopy.findIndex(
            (dish) => dish.id === item.id
          );
          if (matchingDishIndex !== -1) {
            updatedDishesCopy[matchingDishIndex].quantity = item.quantity;
          }
        }
    }
    setUpdatedDishes(mainList);
  }

  function debouncedSearchItem(item) {
    debounce(searchItem(item), 300);
  }

  function searchClear() {
    resetSearch();
    setSearch("");
    setUpdatedDishes(itemsData);
  }

  function clearCart() {
    setPrice(0);
    setAddItem([]);
    var newItemsData = itemsData.map((item) => {
      return {...item, quantity: 0}
    })
    setUpdatedDishes(newItemsData);
    localStorage.removeItem("UpdatedDishes");
    localStorage.removeItem("Items");
    localStorage.removeItem("Total");
  }

  return (
    <>
      <div className="ps-5 pe-5">
        <Header onCart={onCart} clearCart={clearCart}/>
        <div className="search-bar">
          <Search
            searchClear={searchClear}
            search={search}
            setSearch={setSearch}
            debouncedSearchItem={debouncedSearchItem}
          />
        </div>
        <div className="row pt-4 p-5 middle-container">
          <div className="col-8">
            <h5 className="mb-2">
              <b>Main Dishes</b>
            </h5>
            <hr className="line" />
            <MainDishes
              incrQty={incrQty}
              decQty={decQty}
              updatedDishes={updatedDishes}
            />
          </div>
          <div className="col-4">
            <h5 className="mb-2">
              <b>Sides</b>
            </h5>
            <hr className="line" />
            <SideDishes
              incrQty={incrQty}
              decQty={decQty}
              updatedDishes={updatedDishes}
            />
            <h5 className="mt-3 mb-4">
              <b>Drinks</b>
            </h5>
            <hr className="line" />
            <Drinks
              incrQty={incrQty}
              decQty={decQty}
              updatedDishes={updatedDishes}
            />
          </div>
        </div>
      </div>
      <Footer price={price} addItem={addItem}/>
    </>
  );
}

export default Home;
