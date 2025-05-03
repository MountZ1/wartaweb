import { Hono } from "hono";
import { UserLoginScheme, Userscheme } from "../validation/User";
import { validator } from 'hono/validator'
import { AppLayout } from "../views/appviews/AppLayout";
import { AllPost } from "../views/appviews/AllPost";
import { AllPages } from "../views/appviews/AllPages";
import { AllUsers } from "../views/appviews/AllUsers";
import { Library } from "../views/appviews/Library";
import { Categories } from "../views/appviews/Categories";
import { Tags } from "../views/appviews/Tags";
import { Tags as ModelTags } from "../Database/Tags";
import { Dashboard } from "../views/appviews/Dashboard";
import { CreateUser } from "../views/appviews/CreateUser";
import { DeleteUser, getUserForLogin, ShowUser, updateRoleUser, updateStatus, UserStore } from "../Database/User";
import { IndexUsers } from "../Database/User";
import { z } from "zod";
import { MyProfile } from "../views/appviews/MyProfile";
import { Alert } from "../views/PartialComponents/alert";
import { jwt, sign } from "hono/jwt"
import { UsersTable } from "../views/PartialComponents/UserTable";
import { config } from "dotenv";
import { TagTable } from "../views/PartialComponents/TagsTable";
import { TagsScheme } from "../validation/Tags";
import { slugger } from "../library/sluger";
import { truncateDescription } from "../library/truncateDescription";

const app = new Hono();

config({ path: "../../.env" })

app.post('/login', validator("form", (value, c) => {
  const validate = UserLoginScheme.safeParse(value);
  if (!validate.success) {
    c.status(422);
    return c.body(Alert({
      color: 'bg-red-100 text-red-700',
      type: 'Error!! ',
      message: validate.error.errors.map(err => err.path + ': ' + err.message).join(', ')
    }))
  }
  return validate.data;
}), async c => {
  type UserInput = z.infer<typeof UserLoginScheme>
  const data = await c.req.valid('form') as UserInput;
  const hashPassword = await Bun.password.hash(data.password, { algorithm: 'bcrypt', cost: 4 });
  const user = await getUserForLogin(data.username);
  if (!user) {
    c.status(422)
    return c.body(Alert({
      color: 'bg-red-100 text-red-700',
      type: 'Error!! ',
      message: "Can't found the user or potentially user are inactive"
    }))
  }
  if (hashPassword != user.password) {
    c.status(401);
    return c.body(Alert({
      color: 'bg-red-100 text-red-700',
      type: 'Error!! ',
      message: "Username or password might be wrong"
    }))
  }
  const payload = {
    username: user.username,
    role: user.role
  };
  const token = await sign(payload, process.env.JWT_SE)
})
app.get('/auth', (c) => c.html(AppLayout))

app.get('/auth/dashboard', c => c.body(Dashboard))
app.get('/auth/posts', (c) => c.body(AllPost({ tableBody: '' })));
app.get("/auth/categories", c => c.body(Categories));


app.get("/auth/tags", c => c.body(Tags()));

app.get("/auth/gettags", async c => {
  const offset = Number(c.req.query('offset') || '0');
  const tags = await ModelTags.index(offset);

  return c.body(TagTable({
    tags: tags.tags,
    hasMore: tags.hasMore,
    nextOffset: offset + tags.tags.length,
  }));
});

app.post('/auth/tags', validator('form', async (value, c) => {
  const validate = TagsScheme.safeParse(value);
  if (!validate.success) {
    c.status(422);
    return c.body(Alert({
      color: 'bg-yellow-100 text-yellow-700',
      type: 'Validation Error !!',
      message: validate.error.errors.map(err => err.path + ': ' + err.message).join(', ')
    }))
  }

  return validate.data;
}), async c => {
  try {
    type TagInput = z.infer<typeof TagsScheme>;
    const data = await c.req.valid('form') as TagInput;
    if (!data.slug) {
      data.slug = slugger(data.name);
    }
    const result = await ModelTags.store(data);

    const response = `
      <tr data-tag-id="${result[0].id}">
        <td class="px-6 py-2 whitespace-nowrap text-sm">${result[0].name}</td>
        <td class="px-6 py-2 whitespace-nowrap text-sm">${result[0].slug}</td>
        <td class="px-6 py-2 whitespace-nowrap text-sm">${result[0].description || ''}</td>
        <td class="px-6 py-2 whitespace-nowrap text-sm">
          <button class="text-blue-500 hover:underline mr-2" onclick="edit('${encodeURIComponent(JSON.stringify(result[0]))}')">Edit</button>
          <button class="text-red-500 hover:underline" onclick="deleteTag('${result[0].name}')">Delete</button>
        </td>
      </tr>
      <div id="alert" hx-swap-oob="true">
        ${Alert({
      color: 'bg-green-100 text-green-700',
      type: 'Success !!',
      message: 'Creating tag ' + result[0].name
    })}
      </div>`

    if (!result) {
      return c.body(Alert({
        color: 'bg-red-100 text-red-700',
        type: 'Error !!',
        message: 'An unexpected error occurred'
      }), 500)
    }

    return c.body(response);
  } catch (error) {
    console.log(error);
    return c.body(Alert({
      color: 'bg-red-100 text-red-700',
      type: 'Error !!',
      message: 'An unexpected error occurred'
    }), 500)
  }
});

app.post("/auth/tag/:id", validator('form', async (value, c) => {
  const validate = TagsScheme.safeParse(value);
  if (!validate.success) {
    c.status(422);
    return c.body(Alert({
      color: 'bg-yellow-100 text-yellow-700',
      type: 'Validation Error !!',
      message: validate.error.errors.map(err => err.path + ': ' + err.message).join(', ')
    }))
  }

  return validate.data;
}), async c => {
  try {
    type TagInput = z.infer<typeof TagsScheme>;
    const data = await c.req.valid('form') as TagInput;
    const id = await c.req.param('id');

    const result = await ModelTags.update(id, data);
    const response = `
      <tr data-tag-id="${result[0].id}" id="tag-${result[0].id}">
        <td class="px-6 py-2 whitespace-nowrap text-sm">${result[0].name}</td>
        <td class="px-6 py-2 whitespace-nowrap text-sm">${result[0].slug}</td>
        <td class="px-6 py-2 whitespace-nowrap text-sm">${result[0].description || ''}</td>
        <td class="px-6 py-2 whitespace-nowrap text-sm">
          <button class="text-blue-500 hover:underline mr-2" onclick="edit('${encodeURIComponent(JSON.stringify(result[0]))}')">Edit</button>
          <button class="text-red-500 hover:underline" onclick="deleteTag('${result[0].name}')">Delete</button>
        </td>
      </tr>
      `

    if (!result) {
      return c.body(Alert({
        color: 'bg-red-100 text-red-700',
        type: 'Error !!',
        message: 'An unexpected error occurred'
      }), 500)
    }

    return c.body(response);
  } catch (error) {
    console.log(error);
    return c.body(Alert({
      color: 'bg-red-100 text-red-700',
      type: 'Error !!',
      message: 'An unexpected error occurred'
    }), 500)
  }
})


app.get("/auth/library", c => c.body(Library));
app.get("/auth/pages", c => c.body(AllPages))


//Router Handler for users
app.get("/auth/users", async c => {
  return c.body(AllUsers({
    alert: '',
  }));
});

app.get('/auth/getusers/', async c => {
  const isactive = c.req.query('status')
  const role = c.req.query('role')
  const offset = Number(c.req.query('offset') || '0');
  const isActiveStatus = isactive === 'active' ? true : false;
  const roleFilter = role === 'all' ? '' : role;
  const Users = await IndexUsers(offset, isActiveStatus, roleFilter)

  return c.body(UsersTable({
    Users: Users.users,
    hasMore: Users.hasMore,
    nextOffset: offset + Users.users.length,
    currentStatus: isactive,
    currentRole: role
  }))
});

app.get("/auth/create-user", c => c.body(CreateUser));

app.get('/auth/show-user/:username', async c => {
  const username = await c.req.param('username');
  const user = await ShowUser(username)
  return c.body(MyProfile({
    isMine: false,
    username: user.username,
    firstname: user.firstname,
    lastname: user.lastname,
    avatar: user.avatar,
    email: user.email,
    role: user.role
  }))
});

app.get("/auth/my-profile", async c => {
  return c.body(MyProfile({
    isMine: true,
    username: '',
    firstname: '',
    lastname: '',
    avatar: '',
    email: '',
    role: ''
  }));
});

app.post("/auth/store-user", validator("form", async (value, c) => {
  const validate = Userscheme.safeParse(value);
  if (!validate.success) {
    c.status(422);
    return c.body(Alert({
      color: 'bg-yellow-100 text-yellow-700',
      type: 'Validation Error !!',
      message: validate.error.errors.map(err => err.path + ': ' + err.message).join(', ')
    }))
  }
  return validate.data
}), async c => {
  try {
    type UserInput = z.infer<typeof Userscheme>;
    const data = await c.req.valid('form') as UserInput;
    const hashPassword = await Bun.password.hash(data.password, { algorithm: 'bcrypt', cost: 4 });
    const result = await UserStore({ username: data.username, email: data.email, firstname: data.firstname, lastname: data.lastname, password: hashPassword, role: data.role, active: true });
    if (!result) {
      return c.body(Alert({
        color: 'bg-red-100 text-red-700',
        type: 'Error !!',
        message: 'An unexpected error occurred'
      }), 500)
    }
    return c.body(AllUsers({
      alert: Alert({
        color: 'bg-green-100 text-green-700',
        type: 'Success !!',
        message: 'Creating user ' + result[0].username
      }),
    }), 200)
  } catch (error) {
    return c.body(Alert({
      color: 'bg-red-100 text-red-700',
      type: 'Error !!',
      message: 'An unexpected error occurred'
    }), 500)
  }
});

app.post('/auth/user/updatestatus', async c => {
  const data = await c.req.formData();
  const username = data.get('username')?.toString() ?? '';
  const value = data.get('value')?.toString() === 'true';
  const response = await updateStatus(username, value);
  if (!response) {
    return c.body(Alert({
      color: 'bg-red-100 text-red-700',
      type: 'Error !!',
      message: "An unexpected error occurred"
    }), 500)
  }
  return c.body(Alert({
    color: 'bg-green-100 text-green-700',
    type: 'Success !!',
    message: response[0].status ? ` Restored user ${response[0].username}` : ` Dissable user ${response[0].username}`
  }))
});

app.post('/auth/profile/:username', async c => {
  /*type UserInput = z.infer<typeof Userscheme>;
  const data = await c.req.formData() as UserInput;
  console.log(data.role)*/
  const data = await c.req.formData();
  const role = data.get('role')?.toString() ?? '';
  const username = await c.req.param('username');
  const validRoles = ['administrator', 'editor', 'author', 'contributor', 'subscriber'];
  if (!validRoles.includes(role)) {
    return c.body(AllUsers({
      alert: Alert({
        color: 'bg-red-100 text-red-700',
        type: 'Error !!',
        message: "An unexpected error occurred"
      })
    }), 500)
  }
  const user = await updateRoleUser(username, role);
  console.log(user)
  if (!user) {
    return c.body(AllUsers({
      alert: Alert({
        color: 'bg-red-100 text-red-700',
        type: 'Error !!',
        message: "An unexpected error occurred"
      })
    }), 500)

  }
  return c.body(AllUsers({
    alert: Alert({
      color: 'bg-green-100 text-green-700',
      type: 'Success !!',
      message: 'Changing role of user ' + user[0].username
    }),
  }), 200)
})

app.post('/auth/profile/updatemine', c => {
  return c.body('')
})
app.delete("/auth/user/:username", async c => {
  const id = c.req.param("username");
  try {
    const result = await DeleteUser(id);
    return c.body(Alert({
      color: 'bg-green-100 text-green-700',
      type: 'Success !!',
      message: 'Deleting User ' + result[0].username
    }), 200)
  } catch (error) {
    return c.body(Alert({
      color: 'bg-red-100 text-red-700',
      type: 'Error !!',
      message: 'An unexpected error occurred'
    }), 500)
  }
});

export default app;
