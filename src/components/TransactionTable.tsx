import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import { Transaction } from './types';
import { financeCalculations } from '../utils/financeCalculations';
import { Grid } from '@mui/material';
import { formatCurrency } from '../utils/formatting';
import iconComponents from './common/iconComponents';
import { compareDesc, parseISO } from 'date-fns';

// テーブルのヘッダー部分のProps型
interface TransactionTableHeadProps {
  numSelected: number;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rowCount: number;
}

// テーブルのヘッダー行コンポーネント
function TransactionTableHead({
  onSelectAllClick,
  numSelected,
  rowCount,
  
}: TransactionTableHeadProps) {
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all transactions' }}
          />
        </TableCell>
        <TableCell align="left">日付</TableCell>
        <TableCell align="left">カテゴリ</TableCell>
        <TableCell align="left">金額</TableCell>
        <TableCell align="left">内容</TableCell>
      </TableRow>
    </TableHead>
  );
}

// ツールバーPropsの型
interface TransactionTableToolbarProps {
  numSelected: number;
  onDelete: () => void
}

// テーブル上部のツールバー（選択時のアクションなど）
function TransactionTableToolbar({ numSelected, onDelete }: TransactionTableToolbarProps) {
  return (
    <Toolbar>
      {numSelected > 0 ? (
        <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
          月の収支
        </Typography>
      )}
      {numSelected > 0 && (
        <Tooltip title="Delete">
          <IconButton onClick={onDelete}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

// 上部の収支情報を表示するカードのProps
interface FinancialItemProps {
  title: string;
  value: number;
  color: string;
}

// 収支情報（収入・支出・残高）表示コンポーネント
function FinancialItem({ title, value, color }: FinancialItemProps) {
  return (
    <Grid item xs={4} textAlign="center">
      <Typography variant="subtitle1">{title}</Typography>
      <Typography
        fontWeight="bold"
        sx={{ color, fontSize: { xs: '.8rem', sm: '1rem', md: '1.2rem' }, wordBreak: 'break-word' }}
      >
        ￥{formatCurrency(value)}
      </Typography>
    </Grid>
  );
}

// 親から受け取るProps型（月単位の取引データ）
interface TransactionTableProps {
  monthlyTransactions: Transaction[];
  onDeleteTransaction: (transactionId: string | readonly string[]) => Promise<void>;
}

// 収支一覧テーブルのメインコンポーネント
export default function TransactionTable({
    monthlyTransactions,
    onDeleteTransaction
}: TransactionTableProps) {
  const theme = useTheme();
  const [selected, setSelected] = React.useState<readonly string[]>([]); // 選択された行ID
  const [page, setPage] = React.useState(0); // 現在のページ
  const [rowsPerPage, setRowsPerPage] = React.useState(5); // 1ページあたりの行数

  // 「すべて選択」チェックボックスの処理
  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = monthlyTransactions.map((n) => n.id);
      setSelected(newSelected);
    } else {
      setSelected([]);
    }
  };

  // 各行クリック時の選択処理
  const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = [...selected, id];
    } else {
      newSelected = selected.filter((item) => item !== id);
    }
    setSelected(newSelected);
  };

  // ページ切り替え
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  // 行数変更
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  //削除処理
  const handleDelete = () => {
    onDeleteTransaction(selected);
    setSelected([]);
  };

  // 指定IDが選択されているか確認
  const isSelected = (id: string) => selected.includes(id);

  // 空行数の計算（見た目の整え用）
  const emptyRows = Math.max(0, (1 + page) * rowsPerPage - monthlyTransactions.length);

  // 表示対象の取引データを取得（降順で並び替え）
  const visibleRows = React.useMemo(() => {
    const sorted = [...monthlyTransactions].sort((a, b) =>
      compareDesc(parseISO(a.date), parseISO(b.date))
    );
    return sorted.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [page, rowsPerPage, monthlyTransactions]);

  // 収入・支出・残高の計算
  const { income, expense, balance } = financeCalculations(monthlyTransactions);

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <Grid container sx={{ borderBottom: '1px solid rgba(244, 244, 244, 1)' }}>
          <FinancialItem title="収入" value={income} color={theme.palette.incomeColor.main} />
          <FinancialItem title="支出" value={expense} color={theme.palette.expenseColor.main} />
          <FinancialItem title="残高" value={balance} color={theme.palette.balanceColor.main} />
        </Grid>

        <TransactionTableToolbar
          numSelected={selected.length} 
          onDelete={handleDelete}
        />

        <TableContainer>
          <Table size="medium">
            <TransactionTableHead
              numSelected={selected.length}
              rowCount={monthlyTransactions.length}
              onSelectAllClick={handleSelectAllClick}
            />
            <TableBody>
              {visibleRows.map((transaction, index) => {
                const isItemSelected = isSelected(transaction.id);
                const labelId = `transaction-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, transaction.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={transaction.id}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{ 'aria-labelledby': labelId }}
                      />
                    </TableCell>
                    <TableCell component="th" id={labelId} scope="row" padding="none">
                      {transaction.date}
                    </TableCell>
                    <TableCell align="left" sx={{ display: 'flex', alignItems: 'center' }}>
                      {iconComponents[transaction.category]}
                      {transaction.category}
                    </TableCell>
                    <TableCell align="left">{transaction.amount}</TableCell>
                    <TableCell align="left">{transaction.content}</TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={monthlyTransactions.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
