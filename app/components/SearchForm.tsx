import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"

const SearchForm = ({ form, onSubmit }: { form:any, onSubmit:any }) => (
  <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2 mt-2 mb-2">
      <FormField
        control={form.control}
        name="username"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input placeholder="Enter Username" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button className="cursor-pointer" type="submit">Search</Button>
    </form>
  </Form>
);

export default SearchForm
