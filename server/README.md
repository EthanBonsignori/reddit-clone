Server for notReddit

### Migrations:

To generate a new migration (looks at files in dist/entities):

```bash
yarn typeorm migration:generate -n {MigrationName}
```

If error, restart typescript server or delete dist folder and recompile.
