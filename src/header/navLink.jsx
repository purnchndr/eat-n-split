function NavLink({ link, text, classes }) {
  return (
    <div className={`nav-links`}>
      <a className={classes} href={link}>
        {text}
      </a>
    </div>
  );
}

export default NavLink;
