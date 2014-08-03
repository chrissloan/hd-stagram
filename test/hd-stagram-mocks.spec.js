var mocks = {};

mocks.singleImageJSON = {
  data: {
    image_url: "blah.com",
    caption: {
      text: "This is a caption"
    },
    link: "blah.com",
    user: {
      id: "12345",
      username: "Username"
    },
    images: {
      low_resolution: {
        url: "blah.com",
        width: 100,
        height: 100
      }
    }
  }
};

mocks.doubleImageJSON = {
  data: [
    {
      image_url: "blah.com",
      caption: {
        text: "This is a caption"
      },
      link: "blah.com",
      user: {
        id: "12345",
        username: "Username"
      },
      images: {
        low_resolution: {
          url: "blah.com",
          width: 100,
          height: 100
        }
      }
    },
    {
      image_url: "blah.com",
      caption: {
        text: "This is a caption"
      },
      link: "blah.com",
      user: {
        id: "12345",
        username: "Username"
      },
      images: {
        low_resolution: {
          url: "blah.com",
          width: 100,
          height: 100
        }
      }
    }
  ]
};
