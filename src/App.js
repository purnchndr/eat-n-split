import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [friends, setFriends] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handelSetShowAddFriend() {
    setShowAddFriend((v) => !v);
  }

  function handelSetSelectedFriend(friend) {
    setSelectedFriend((curr) => (friend.id === curr?.id ? null : friend));
    setShowAddFriend(false);
  }

  function handelAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
    setShowAddFriend(false);
  }

  function handelChangeBalance(bal) {
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + bal }
          : friend
      )
    );
    setSelectedFriend(null);
  }

  return (
    <div className="app">
      <h1>Split you bills with friends 💸</h1>
      <div className="sidebar">
        <FriendList
          friends={friends}
          onSelectFriend={handelSetSelectedFriend}
          selectedFriend={selectedFriend}
        />

        {showAddFriend && <FormAddFriend onAddFriend={handelAddFriend} />}
        <Button onClick={handelSetShowAddFriend}>
          {showAddFriend ? "hide" : "Add Friend"}
        </Button>
      </div>
      {selectedFriend && (
        <FormASplitBill
          onChangeBalance={handelChangeBalance}
          selectedFriend={selectedFriend}
        />
      )}
    </div>
  );
}

const FriendList = ({ friends, onSelectFriend, selectedFriend }) => {
  return (
    <ul>
      {friends.map((friend, i) => (
        <Friend
          friend={friend}
          key={i}
          selectedFriend={selectedFriend}
          onSelectFriend={onSelectFriend}
        />
      ))}
    </ul>
  );
};

const Friend = ({ friend, onSelectFriend, selectedFriend }) => {
  const isSelected = friend?.id === selectedFriend?.id;

  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance > 0 && (
        <p className="green">
          You owe {friend.name} {Math.abs(friend.balance)}₹
        </p>
      )}
      {friend.balance < 0 && (
        <p className="red">
          {friend.name} owe you {Math.abs(friend.balance)}₹
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even.</p>}
      <Button onClick={() => onSelectFriend(friend)}>
        {isSelected ? "Close" : "Select"}
      </Button>
    </li>
  );
};

const Button = ({ children, onClick }) => {
  return (
    <button onClick={onClick} className="button">
      {children}
    </button>
  );
};

const FormAddFriend = ({ onAddFriend }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48?u=933372");
  function handelAddFriendForm(event) {
    event.preventDefault();
    const friend = {
      name,
      image,
      id: crypto.randomUUID(),
      balance: 0,
    };
    onAddFriend(friend);
    setName("");
    setImage("https://i.pravatar.cc/48?u=933372");
  }
  return (
    <form className="form-add-friend" onSubmit={handelAddFriendForm}>
      <label>🐭Friend Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label>📸 Image Url</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <Button>Add</Button>
    </form>
  );
};

const FormASplitBill = ({ selectedFriend, onChangeBalance }) => {
  const [bill, setBill] = useState("");
  const [userPay, setUserPay] = useState("");
  const friendsBill = bill - userPay;
  const [paideBy, setPaidBy] = useState("user");

  function handelSubmit(event) {
    event.preventDefault();
    if (!bill || !userPay) return;
    const balance = paideBy === "you" ? bill - userPay : -(bill - friendsBill);
    onChangeBalance(balance);
  }

  return (
    <form className="form-split-bill" onSubmit={handelSubmit}>
      <h2>Split a bill with {selectedFriend.name}</h2>
      <label>💰Bill Value</label>
      <input
        type="number"
        value={bill}
        onChange={(e) => setBill(+e.target.value)}
      />
      <label>💷Your Expences</label>
      <input
        type="number"
        value={userPay}
        onChange={(e) =>
          setUserPay(+e.target.value <= bill ? +e.target.value : bill)
        }
      />
      <label>💵{selectedFriend.name}'s Expences</label>
      <input type="number" disabled value={friendsBill} />
      <label>🤑Who is paying the bill</label>
      <select value={paideBy} onChange={(e) => setPaidBy(e.target.value)}>
        <option value="you">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>
      <Button>Add</Button>
    </form>
  );
};
