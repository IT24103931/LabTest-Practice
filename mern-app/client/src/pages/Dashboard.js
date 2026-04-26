import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getItems, createItem, updateItem, deleteItem } from '../services/api';
import ItemCard from '../components/ItemCard';

const Dashboard = () => {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ title: '', description: '' , category: ''});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const { data } = await getItems();
      setItems(data);
    } catch (err) {
      setError('Failed to load items');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    setSubmitting(true);
    try {
      const { data } = await createItem(form);
      setItems((prev) => [data, ...prev]);
      setForm({ title: '', description: '' });
    } catch {
      setError('Failed to create item');
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggle = async (id, updates) => {
    try {
      const { data } = await updateItem(id, updates);
      setItems((prev) => prev.map((it) => (it._id === id ? data : it)));
    } catch {
      setError('Failed to update item');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this item?')) return;
    try {
      await deleteItem(id);
      setItems((prev) => prev.filter((it) => it._id !== id));
    } catch {
      setError('Failed to delete item');
    }
  };

  const pending = items.filter((i) => !i.completed);
  const done = items.filter((i) => i.completed);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome back, <strong>{user?.name}</strong> 👋</p>
      </div>

      <div className="stats-row">
        <div className="stat-card">
          <span className="stat-num">{items.length}</span>
          <span className="stat-label">Total Items</span>
        </div>
        <div className="stat-card">
          <span className="stat-num">{pending.length}</span>
          <span className="stat-label">Pending</span>
        </div>
        <div className="stat-card">
          <span className="stat-num">{done.length}</span>
          <span className="stat-label">Completed</span>
        </div>
      </div>

      {error && (
        <div className="alert alert-error" onClick={() => setError(null)}>
          {error} <span style={{ float: 'right', cursor: 'pointer' }}>✕</span>
        </div>
      )}

      <div className="create-form-card">
        <h2>Add New Item</h2>
        <form onSubmit={handleCreate} className="create-form">
          <div className="form-group">
            <input
              type="text"
              placeholder="Item title..."
              value={form.title}
              onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Description (optional)"
              value={form.description}
              onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
            />
          </div>
          {/*  */}
          <div className="form-group">
            <input
              type="text"
              placeholder="Category"
              value={form.category}
              onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
            />
          </div>
          
          <button type="submit" className="btn btn-primary" disabled={submitting}>
            {submitting ? 'Adding...' : '+ Add Item'}
          </button>
        </form>
      </div>

      <div className="items-section">
        {loading ? (
          <div className="loading-state">Loading items...</div>
        ) : items.length === 0 ? (
          <div className="empty-state">
            <p>No items yet. Create your first one above! 🚀</p>
          </div>
        ) : (
          <>
            {pending.length > 0 && (
              <>
                <h2 className="section-title">Pending ({pending.length})</h2>
                <div className="items-grid">
                  {pending.map((item) => (
                    <ItemCard key={item._id} item={item} onToggle={handleToggle} onDelete={handleDelete} />
                  ))}
                </div>
              </>
            )}
            {done.length > 0 && (
              <>
                <h2 className="section-title">Completed ({done.length})</h2>
                <div className="items-grid">
                  {done.map((item) => (
                    <ItemCard key={item._id} item={item} onToggle={handleToggle} onDelete={handleDelete} />
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
