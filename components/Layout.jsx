import InfoModal from "./InfoModal";
const Layout = ({ children }) => {
  return (
    <div>
      <InfoModal />
      {children}
    </div>
  );
};

export default Layout;
