class HomeController {
  index = (req, res) => {
    res.json({
      ola: 'mundo',
    });
  };
}

export default new HomeController();
