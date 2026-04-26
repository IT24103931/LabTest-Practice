const ItemCard = ({ item, onToggle, onDelete }) => {
  return (
    <div className={`item-card ${item.completed ? 'completed' : ''}`}>
      <div className="item-card-body">
        <h3 className="item-title">{item.title}</h3>
        {item.description && <p className="item-desc">{item.description}</p>}
        <span className="item-date">
          {new Date(item.createdAt).toLocaleDateString()}
        </span>
      </div>
      <div className="item-card-actions">
        <button
          className={`btn ${item.completed ? 'btn-outline' : 'btn-success'}`}
          onClick={() => onToggle(item._id, { completed: !item.completed })}
        >
          {item.completed ? '↩ Undo' : '✓ Done'}
        </button>
        <button className="btn btn-danger" onClick={() => onDelete(item._id)}>
          🗑 Delete
        </button>
      </div>
    </div>
  );
};

export default ItemCard;
