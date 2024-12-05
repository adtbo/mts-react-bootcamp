import ProtectedRoute from "../../components/protected/protectedRoute";

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <div>
        <h1>Hello World from Dahsboard</h1>
        <button className="btn btn-primary">Click me</button>
      </div>
    </ProtectedRoute>
  );
}
